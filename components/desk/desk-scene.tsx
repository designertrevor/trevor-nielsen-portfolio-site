"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { DeskArt, EDGE_COLORS, LAYOUTS, PhoneArt, underNight, type Variant } from "@/components/desk/desk-art";
import { type DeskObjectId, DESK_OBJECTS } from "@/components/desk/desk-objects";
import { ObjectDialog } from "@/components/desk/object-dialog";
import { daylight, formatOfficeTime, officeTimeAt } from "@/lib/daylight";

/* The virtual office: an illustration of Trevor's desk with the real site
   running on the monitor (or on a phone propped on the desk, on phones).
   Clicking the screen zooms the whole room until the screen fills the
   viewport 1:1, then hands off to the real page underneath, so the zoom and
   the site are one continuous move. */

const ZOOM_MS = 1100;

/* Viewport as a cached "w×h" string so useSyncExternalStore sees a stable
   snapshot between resizes */
function subscribeViewport(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}
const viewportSnapshot = () => `${window.innerWidth}x${window.innerHeight}`;

function geometry(vw: number, vh: number) {
  const variant: Variant = vw >= 768 && vw / vh >= 1.1 ? "desk" : "phone";
  const L = LAYOUTS[variant];
  /* The screen takes the viewport's aspect, so at full zoom it IS the page */
  const sh = (L.screenW * vh) / vw;
  const top = L.screenBottom - sh;
  const k = Math.max(vw / L.W, vh / L.H);
  const ox = (vw - L.W * k) / 2;
  /* Crop mostly from the bottom (desk front) so the wall stays in view */
  const oy = (vh - L.H * k) * L.cropY;
  const Z = vw / L.screenW;
  return { variant, L, sh, top, k, ox, oy, Z, vw, vh };
}
type Geometry = ReturnType<typeof geometry>;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/* Keyframes for a zoom whose scale grows geometrically (so it feels like a
   steady push in, not a lurch at the end) around the screen's own corner,
   which travels to the viewport's corner. */
function zoomFrames(g: Geometry) {
  const frames: Keyframe[] = [];
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const e = easeInOut(i / steps);
    const s = g.k * (g.Z / g.k) ** e;
    const p = (s - g.k) / (g.Z - g.k);
    const sx = g.ox + g.k * g.L.screenX;
    const sy = g.oy + g.k * g.top;
    const cx = sx * (1 - p);
    const cy = sy * (1 - p);
    frames.push({ transform: `translate(${cx - s * g.L.screenX}px, ${cy - s * g.top}px) scale(${s})` });
  }
  return frames;
}
const restTransform = (g: Geometry) => `translate(${g.ox}px, ${g.oy}px) scale(${g.k})`;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function DeskScene({ startInside }: { startInside: boolean }) {
  const router = useRouter();
  const vp = useSyncExternalStore(subscribeViewport, viewportSnapshot, () => "");
  const [now, setNow] = useState(0);
  const [previewHour, setPreviewHour] = useState<number | null>(null);
  const [picked, setPicked] = useState<DeskObjectId | null>(null);
  const [hover, setHover] = useState<DeskObjectId | null>(null);
  const [siteLoaded, setSiteLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  /* Arriving from the site's "zoom out" link: start inside the screen and
     pull back once the site in the monitor has painted */
  const [arriving, setArriving] = useState(startInside);

  const g = vp ? geometry(...(vp.split("x").map(Number) as [number, number])) : null;
  const time = previewHour === null ? now : officeTimeAt(previewHour, now);
  const { light, golden } = daylight(time);

  useEffect(() => {
    const update = () => setNow(Date.now());
    /* A timeout, not rAF: rAF never fires in a background tab, which would
       leave the room unrendered until the tab is shown */
    const first = setTimeout(update, 0);
    const tick = setInterval(update, 15_000);
    router.prefetch("/");
    return () => {
      clearTimeout(first);
      clearInterval(tick);
    };
  }, [router]);

  useEffect(() => {
    if (window.location.search) window.history.replaceState(null, "", "/desk");
  }, []);

  /* Blend Safari's bars into the wall and desk, dimming with the room */
  const edgeTop = underNight(EDGE_COLORS.top, light);
  const edgeBottom = underNight(EDGE_COLORS.bottom, light);
  useEffect(() => {
    const root = document.documentElement;
    const metas = [...document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')];
    const saved = metas.map((m) => m.content);
    root.style.setProperty("--edge-top-background", edgeTop);
    root.style.setProperty("--edge-bottom-background", edgeBottom);
    root.style.background = edgeTop;
    document.body.style.background = edgeBottom;
    metas.forEach((m) => (m.content = edgeTop));
    return () => {
      root.style.removeProperty("--edge-top-background");
      root.style.removeProperty("--edge-bottom-background");
      root.style.background = "";
      document.body.style.background = "";
      metas.forEach((m, i) => (m.content = saved[i]));
    };
  }, [edgeTop, edgeBottom]);

  const enter = useCallback(() => {
    const el = sceneRef.current;
    if (!g || !el || busy.current) return;
    busy.current = true;
    const go = () => {
      /* The real page's load cascade would replay over content the visitor
         is already looking at; skip it for this hand-off */
      document.documentElement.classList.add("from-desk");
      router.push("/");
    };
    if (reducedMotion()) return go();
    setZoomed(true);
    el.animate(zoomFrames(g), { duration: ZOOM_MS, fill: "forwards", easing: "linear" }).finished.then(go);
  }, [g, router]);

  const onSiteLoad = () => {
    setSiteLoaded(true);
    const el = sceneRef.current;
    if (!arriving || !g || !el) return;
    if (reducedMotion()) return setArriving(false);
    setZoomed(true);
    /* Hold the last frame until React has swapped in the rest transform,
       then drop the animation, so there is no one-frame snap back inside */
    const pullBack = el.animate(zoomFrames(g).reverse(), { duration: ZOOM_MS, fill: "forwards", easing: "linear" });
    pullBack.finished.then(() => {
      setArriving(false);
      setZoomed(false);
      requestAnimationFrame(() => pullBack.cancel());
    });
  };

  if (!g || !now) return <div className="fixed inset-0" style={{ background: EDGE_COLORS.top }} />;

  const Art = g.variant === "desk" ? DeskArt : PhoneArt;
  const zoomTransform = zoomFrames(g).at(-1)!.transform as string;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: edgeBottom }}>
      <div className="edge-top" aria-hidden="true" />
      <div className="edge-bottom" aria-hidden="true" />
      <div
        ref={sceneRef}
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: g.L.W,
          height: g.L.H,
          transform: arriving ? zoomTransform : restTransform(g),
        }}
      >
        <Art sh={g.sh} light={light} golden={golden} time={time} onPick={setPicked} onHover={setHover} />
        {/* The live site, rendered at real viewport size and shrunk into the
            screen, so at full zoom it lines up pixel for pixel */}
        <div
          className="absolute overflow-hidden bg-background"
          style={{ left: g.L.screenX, top: g.top, width: g.L.screenW, height: g.sh }}
        >
          <iframe
            src="/"
            title="Trevor Nielsen's portfolio"
            tabIndex={-1}
            aria-hidden="true"
            onLoad={onSiteLoad}
            className="pointer-events-none absolute top-0 left-0 origin-top-left border-0 transition-opacity duration-500"
            style={{
              width: g.vw,
              height: g.vh,
              transform: `scale(${g.L.screenW / g.vw})`,
              opacity: siteLoaded ? 1 : 0,
            }}
          />
          <button
            type="button"
            onClick={enter}
            onPointerEnter={() => setHover(null)}
            aria-label="Enter Trevor's portfolio"
            className="desk-screen absolute inset-0 cursor-zoom-in"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 flex flex-col items-center gap-3 px-4 transition-opacity duration-300"
        style={{ bottom: "max(24px, calc(env(safe-area-inset-bottom) + 16px))", opacity: zoomed ? 0 : 1 }}
      >
        <p className="rounded-full bg-black/55 px-3 py-1 text-center text-xs font-medium text-white backdrop-blur-sm">
          {hover
            ? DESK_OBJECTS[hover].label
            : `${g.variant === "phone" ? "Tap" : "Click"} the screen to see my work, or poke around the office`}
        </p>
        <button
          type="button"
          onClick={enter}
          className="pointer-events-auto h-12 bg-foreground px-7 font-sans text-sm font-semibold text-background shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-transform active:scale-[0.96]"
        >
          See my work
        </button>
      </div>

      <TimeScrubber hour={previewHour} onChange={setPreviewHour} time={time} hidden={zoomed} />
      <ObjectDialog id={picked} onClose={() => setPicked(null)} />
    </div>
  );
}

/* Prototype-only: preview the room at any hour of the Smithfield day */
function TimeScrubber({
  hour,
  onChange,
  time,
  hidden,
}: {
  hour: number | null;
  onChange: (h: number | null) => void;
  time: number;
  hidden: boolean;
}) {
  return (
    <div
      className="absolute right-3 flex items-center gap-3 bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-sm transition-opacity"
      style={{ top: "max(12px, calc(env(safe-area-inset-top) + 8px))", opacity: hidden ? 0 : 1 }}
    >
      <label htmlFor="desk-hour" className="font-semibold whitespace-nowrap">
        Prototype · {time ? formatOfficeTime(time) : ""}
      </label>
      <input
        id="desk-hour"
        type="range"
        min={0}
        max={23.75}
        step={0.25}
        value={hour ?? 12}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-28 accent-white"
      />
      <button
        type="button"
        onClick={() => onChange(null)}
        className="underline-offset-2 hover:underline disabled:opacity-50"
        disabled={hour === null}
      >
        Live
      </button>
    </div>
  );
}
