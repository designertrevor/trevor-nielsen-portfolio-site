"use client";

import type { DeskObjectId } from "@/components/desk/desk-objects";
import { DESK_OBJECTS } from "@/components/desk/desk-objects";
import { formatOfficeTime, mix } from "@/lib/daylight";

/* Placeholder illustration of the office, drawn as flat poster shapes in the
   DD palette. Two compositions: the wide desk (site on the monitor) and a
   portrait one for phones (site on a phone propped on the desk). Real art
   replaces these shapes later; the hotspot ids and screen geometry stay. */

const INK = "#2d1f1a";
const WALL = "#efe8dd";
const DESK_TOP = "#c99d74";
const DESK_FRONT = "#9a6f4c";
const BLUE = "#d3d8eb";
const PINK = "#e7dae4";
const SAND = "#ebe4db";
const SW = 3;

/* Where the live site sits in each composition, in design units. The
   screen's height is derived from the viewport so the zoom lands 1:1. */
export const LAYOUTS = {
  desk: { W: 1600, H: 1000, screenX: 560, screenW: 560, screenBottom: 625, cropY: 0.15 },
  phone: { W: 430, H: 932, screenX: 130, screenW: 170, screenBottom: 650, cropY: 0.3 },
} as const;
export type Variant = keyof typeof LAYOUTS;

export type ArtProps = {
  sh: number;
  light: number;
  golden: number;
  time: number;
  onPick: (id: DeskObjectId) => void;
  onHover: (id: DeskObjectId | null) => void;
};

/* Sky through the window: night navy, golden-hour peach, daytime blue */
export function skyColor(light: number, golden: number) {
  return mix(mix("#1f2a48", "#bcd7ea", light), "#f0a878", golden * 0.65);
}

/* What a base color looks like under the scene's night overlay, so Safari's
   bars can match the dimmed wall and desk exactly */
export function underNight(base: string, light: number) {
  const a = (1 - light) * 0.72;
  const night = "#1b2340";
  const p = parseInt(base.slice(1), 16);
  const n = parseInt(night.slice(1), 16);
  const ch = (s: number) => {
    const b = (p >> s) & 255;
    const m = (b * ((n >> s) & 255)) / 255;
    return Math.round(b + (m - b) * a);
  };
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}
/* Colors at the very top and bottom of both compositions */
export const EDGE_COLORS = { top: WALL, bottom: DESK_FRONT };

function Hot({
  id,
  onPick,
  onHover,
  children,
}: {
  id: DeskObjectId;
  onPick: ArtProps["onPick"];
  onHover: ArtProps["onHover"];
  children: React.ReactNode;
}) {
  return (
    <g
      className="desk-hot"
      role="button"
      tabIndex={0}
      aria-label={DESK_OBJECTS[id].label}
      onClick={() => onPick(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick(id);
        }
      }}
      onPointerEnter={() => onHover(id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
    >
      {children}
    </g>
  );
}

/* Shared light layers: the night multiply wash, the monitor's glow once the
   room goes dark, and a warm golden-hour cast */
function Lighting({
  W,
  H,
  light,
  golden,
  glow,
}: {
  W: number;
  H: number;
  light: number;
  golden: number;
  glow: { cx: number; cy: number; rx: number; ry: number };
}) {
  return (
    <>
      <rect width={W} height={H} fill="#f2a35e" opacity={golden * 0.16} style={{ mixBlendMode: "multiply" }} />
      <rect width={W} height={H} fill="#1b2340" opacity={(1 - light) * 0.72} style={{ mixBlendMode: "multiply" }} />
      <ellipse {...glow} fill="url(#screen-glow)" opacity={(1 - light) * 0.6} style={{ mixBlendMode: "screen" }} />
    </>
  );
}

function Defs() {
  return (
    <defs>
      <radialGradient id="screen-glow">
        <stop offset="0%" stopColor="#dfe6ff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#dfe6ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sunbeam" x1="0" x2="1" y1="0" y2="0.3">
        <stop offset="0%" stopColor="#fff6d6" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#fff6d6" stopOpacity="0" />
      </linearGradient>
      <filter id="led-glow" x="-20%" y="-50%" width="140%" height="200%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/* Window onto Cache Valley: sky, the Wellsville range, stars after dark */
function Window({ x, y, w, h, light, golden }: { x: number; y: number; w: number; h: number; light: number; golden: number }) {
  const gx = x + 12;
  const gy = y + 12;
  const gw = w - 24;
  const gh = h - 24;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#fbf8f2" stroke={INK} strokeWidth={SW} />
      <rect x={gx} y={gy} width={gw} height={gh} fill={skyColor(light, golden)} />
      <g opacity={1 - light}>
        {[0.15, 0.42, 0.7, 0.28, 0.85, 0.55].map((fx, i) => (
          <circle key={i} cx={gx + gw * fx} cy={gy + gh * (0.12 + ((i * 37) % 30) / 100)} r={2} fill="#fff" />
        ))}
      </g>
      <polygon
        points={`${gx},${gy + gh} ${gx},${gy + gh * 0.72} ${gx + gw * 0.22},${gy + gh * 0.58} ${gx + gw * 0.4},${gy + gh * 0.68} ${gx + gw * 0.62},${gy + gh * 0.5} ${gx + gw * 0.82},${gy + gh * 0.64} ${gx + gw},${gy + gh * 0.6} ${gx + gw},${gy + gh}`}
        fill={mix("#2c3550", "#8fa58c", light)}
      />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={INK} strokeWidth={SW} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={INK} strokeWidth={SW} />
      <rect x={x - 12} y={y + h} width={w + 24} height={14} fill="#fbf8f2" stroke={INK} strokeWidth={SW} />
    </g>
  );
}

/* The LED clock's case sits in the room; its digits draw after the night
   wash (ClockDigits) so they keep glowing in the dark */
function Clock({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} fill="#211816" stroke={INK} strokeWidth={SW} />;
}
function ClockDigits({ x, y, w, h, time, size }: { x: number; y: number; w: number; h: number; time: number; size: number }) {
  return (
    <text
      x={x + w / 2}
      y={y + h / 2}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#ff6a3d"
      filter="url(#led-glow)"
      style={{ fontFamily: "ui-monospace, Menlo, monospace", fontWeight: 700, fontSize: size, letterSpacing: 2 }}
    >
      {time ? formatOfficeTime(time).replace(/\s?[AP]M/, "") : ""}
    </text>
  );
}

function Can({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={50} height={85} fill="#b5302a" stroke={INK} strokeWidth={SW} />
      <rect x={x} y={y + 30} width={50} height={22} fill="#f7f6f3" />
      <rect x={x} y={y} width={50} height={85} fill="none" stroke={INK} strokeWidth={SW} />
      <ellipse cx={x + 25} cy={y} rx={25} ry={6} fill="#cfcfd2" stroke={INK} strokeWidth={SW} />
    </g>
  );
}

function Bobble({ cx, base }: { cx: number; base: number }) {
  return (
    <g>
      <rect x={cx - 13} y={base - 32} width={26} height={32} fill="#56679b" stroke={INK} strokeWidth={SW} />
      <circle cx={cx} cy={base - 52} r={22} fill="#f0c9a6" stroke={INK} strokeWidth={SW} />
      <circle cx={cx - 7} cy={base - 54} r={2.5} fill={INK} />
      <circle cx={cx + 7} cy={base - 54} r={2.5} fill={INK} />
    </g>
  );
}

function Frame({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#7a5a3f" stroke={INK} strokeWidth={SW} />
      <rect x={x + 9} y={y + 9} width={w - 18} height={h - 18} fill={BLUE} />
      <circle cx={x + w / 2} cy={y + h * 0.42} r={w * 0.14} fill="#f0c9a6" />
      <rect x={x + w * 0.3} y={y + h * 0.6} width={w * 0.4} height={h * 0.3 - 9} fill="#56679b" />
    </g>
  );
}

function Notebook({ points, lines }: { points: string; lines: [number, number, number][] }) {
  return (
    <g>
      <polygon points={points} fill="#f7f6f3" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {lines.map(([x1, x2, y], i) => (
        <line key={i} x1={x1} x2={x2} y1={y} y2={y} stroke="#b9b2a6" strokeWidth={2} />
      ))}
    </g>
  );
}

function Sticky({ x, y, fill, r = 0 }: { x: number; y: number; fill: string; r?: number }) {
  return (
    <g transform={`rotate(${r} ${x + 22} ${y + 22})`}>
      <rect x={x} y={y} width={44} height={44} fill={fill} stroke={INK} strokeWidth={2} />
      <line x1={x + 8} x2={x + 36} y1={y + 16} y2={y + 16} stroke={INK} strokeWidth={2} opacity={0.5} />
      <line x1={x + 8} x2={x + 28} y1={y + 26} y2={y + 26} stroke={INK} strokeWidth={2} opacity={0.5} />
    </g>
  );
}

function Laptop({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x + w * 0.3} y={y + h - 6} width={w * 0.4} height={22} fill="#3a3330" stroke={INK} strokeWidth={SW} />
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#c9ccd2" stroke={INK} strokeWidth={SW} />
      {/* Stickers: logos and illustrations Trevor has made */}
      <circle cx={x + w * 0.28} cy={y + h * 0.28} r={w * 0.12} fill={PINK} stroke={INK} strokeWidth={2} />
      <rect x={x + w * 0.55} y={y + h * 0.16} width={w * 0.28} height={w * 0.2} fill={BLUE} stroke={INK} strokeWidth={2} transform={`rotate(8 ${x + w * 0.69} ${y + h * 0.26})`} />
      <polygon points={`${x + w * 0.2},${y + h * 0.78} ${x + w * 0.36},${y + h * 0.5} ${x + w * 0.52},${y + h * 0.78}`} fill="#d9ab5f" stroke={INK} strokeWidth={2} />
      <circle cx={x + w * 0.72} cy={y + h * 0.66} r={w * 0.1} fill="#97c2a3" stroke={INK} strokeWidth={2} />
    </g>
  );
}

function Books({ x, base, w, scale = 1 }: { x: number; base: number; w: number; scale?: number }) {
  const t = 40 * scale;
  return (
    <g>
      <rect x={x} y={base - t} width={w} height={t} fill={BLUE} stroke={INK} strokeWidth={SW} />
      <rect x={x + 14 * scale} y={base - t * 1.85} width={w - 30 * scale} height={t * 0.85} fill={PINK} stroke={INK} strokeWidth={SW} />
      <rect x={x + 5 * scale} y={base - t * 2.6} width={w - 14 * scale} height={t * 0.75} fill="#d9ab5f" stroke={INK} strokeWidth={SW} />
    </g>
  );
}

function Poster({ x, y, w, h, fill, kind }: { x: number; y: number; w: number; h: number; fill: string; kind: "sun" | "hill" | "film" }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={INK} strokeWidth={SW} />
      {kind === "sun" && <circle cx={x + w / 2} cy={y + h * 0.45} r={w * 0.25} fill="#d9ab5f" />}
      {kind === "hill" && (
        <polygon points={`${x + 8},${y + h - 10} ${x + w * 0.45},${y + h * 0.35} ${x + w - 8},${y + h - 10}`} fill="#5c7d63" />
      )}
      {kind === "film" && (
        <>
          <rect x={x + 10} y={y + 10} width={w - 20} height={h * 0.62} fill={INK} />
          <rect x={x + 14} y={y + h * 0.74} width={w - 28} height={8} fill={INK} opacity={0.6} />
          <rect x={x + 22} y={y + h * 0.84} width={w - 44} height={6} fill={INK} opacity={0.4} />
        </>
      )}
    </g>
  );
}

export function DeskArt({ sh, light, golden, time, onPick, onHover }: ArtProps) {
  const { W, H, screenX, screenW, screenBottom } = LAYOUTS.desk;
  const top = screenBottom - sh;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute inset-0 block">
      <Defs />
      <rect width={W} height={690} fill={WALL} />
      <polygon points="362,120 362,440 760,600 760,250" fill="url(#sunbeam)" opacity={light * 0.55} />
      <Window x={90} y={90} w={260} h={360} light={light} golden={golden} />
      <Hot id="posters" onPick={onPick} onHover={onHover}>
        <Poster x={405} y={100} w={115} h={150} fill={PINK} kind="sun" />
        <Poster x={405} y={278} w={115} h={140} fill={BLUE} kind="hill" />
      </Hot>
      <Hot id="clock" onPick={onPick} onHover={onHover}>
        <Clock x={1180} y={90} w={270} h={86} />
      </Hot>
      <Hot id="movies" onPick={onPick} onHover={onHover}>
        <Poster x={1200} y={215} w={110} h={175} fill={SAND} kind="film" />
        <Poster x={1340} y={215} w={110} h={175} fill={PINK} kind="film" />
        <Bobble cx={1275} base={597} />
      </Hot>

      {/* Desk */}
      <rect y={690} width={W} height={80} fill={DESK_TOP} />
      <rect y={770} width={W} height={H - 770} fill={DESK_FRONT} />
      <line x1={0} x2={W} y1={770} y2={770} stroke={INK} strokeWidth={SW} />

      {/* Monitor: the screen itself is a hole the live site shows through */}
      <rect x={815} y={screenBottom + 26} width={50} height={52} fill="#3a3330" stroke={INK} strokeWidth={SW} />
      <rect x={740} y={696} width={200} height={12} fill="#3a3330" stroke={INK} strokeWidth={SW} />
      <rect x={screenX - 16} y={top - 16} width={screenW + 32} height={sh + 46} fill={INK} />
      <rect x={screenX} y={top} width={screenW} height={sh} fill="#111" />
      <Hot id="sticky" onPick={onPick} onHover={onHover}>
        <Sticky x={screenX + screenW + 2} y={top + 10} fill="#f4e6a6" r={6} />
        <Sticky x={screenX + screenW + 6} y={top + 62} fill={PINK} r={-4} />
        <Sticky x={screenX + screenW + 22} y={top - 40} fill={BLUE} r={10} />
      </Hot>

      <Hot id="laptop" onPick={onPick} onHover={onHover}>
        <Laptop x={345} y={505} w={170} h={170} />
      </Hot>
      <Hot id="photos" onPick={onPick} onHover={onHover}>
        <Frame x={200} y={598} w={100} h={102} />
      </Hot>
      <Hot id="books" onPick={onPick} onHover={onHover}>
        <Books x={1180} base={700} w={190} />
      </Hot>
      <Hot id="soda" onPick={onPick} onHover={onHover}>
        <Can x={1405} y={615} />
      </Hot>
      <Hot id="notebook" onPick={onPick} onHover={onHover}>
        <Notebook
          points="935,722 1105,722 1122,760 918,760"
          lines={[
            [950, 1090, 734],
            [945, 1100, 746],
          ]}
        />
      </Hot>

      <Lighting W={W} H={H} light={light} golden={golden} glow={{ cx: screenX + screenW / 2, cy: top + sh / 2, rx: screenW, ry: sh + 160 }} />
      <ClockDigits x={1180} y={90} w={270} h={86} time={time} size={52} />
    </svg>
  );
}

export function PhoneArt({ sh, light, golden, time, onPick, onHover }: ArtProps) {
  const { W, H, screenX, screenW, screenBottom } = LAYOUTS.phone;
  const top = screenBottom - sh;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute inset-0 block">
      <Defs />
      <rect width={W} height={600} fill={WALL} />
      <polygon points="186,70 186,250 330,330 330,150" fill="url(#sunbeam)" opacity={light * 0.55} />
      <Window x={24} y={50} w={156} h={200} light={light} golden={golden} />
      <Hot id="clock" onPick={onPick} onHover={onHover}>
        <Clock x={216} y={52} w={190} h={60} />
      </Hot>
      <Hot id="movies" onPick={onPick} onHover={onHover}>
        <Poster x={216} y={136} w={86} h={124} fill={SAND} kind="film" />
      </Hot>
      <Hot id="posters" onPick={onPick} onHover={onHover}>
        <Poster x={318} y={136} w={88} h={124} fill={PINK} kind="sun" />
      </Hot>

      {/* Monitor, asleep behind the phone */}
      <rect x={250} y={540} width={34} height={62} fill="#3a3330" stroke={INK} strokeWidth={SW} />
      <rect x={110} y={300} width={312} height={250} fill={INK} />
      <rect x={122} y={312} width={288} height={214} fill="#1a1f2e" />
      <Hot id="sticky" onPick={onPick} onHover={onHover}>
        <Sticky x={378} y={286} fill="#f4e6a6" r={8} />
        <Sticky x={30} y={290} fill={BLUE} r={-6} />
      </Hot>

      {/* Desk */}
      <rect y={600} width={W} height={140} fill={DESK_TOP} />
      <rect y={740} width={W} height={H - 740} fill={DESK_FRONT} />
      <line x1={0} x2={W} y1={740} y2={740} stroke={INK} strokeWidth={SW} />

      <Hot id="laptop" onPick={onPick} onHover={onHover}>
        <Laptop x={10} y={468} w={100} h={130} />
      </Hot>
      <Hot id="books" onPick={onPick} onHover={onHover}>
        <Books x={318} base={612} w={104} scale={0.62} />
      </Hot>
      <Hot id="movies" onPick={onPick} onHover={onHover}>
        <Bobble cx={368} base={548} />
      </Hot>
      <Hot id="photos" onPick={onPick} onHover={onHover}>
        <Frame x={22} y={640} w={78} h={80} />
      </Hot>
      <Hot id="soda" onPick={onPick} onHover={onHover}>
        <Can x={356} y={640} />
      </Hot>

      {/* Phone propped on a little stand: the live site shows through */}
      <polygon points={`${screenX + 30},${screenBottom + 30} ${screenX + screenW - 30},${screenBottom + 30} ${screenX + screenW - 44},${screenBottom + 8} ${screenX + 44},${screenBottom + 8}`} fill="#3a3330" stroke={INK} strokeWidth={SW} />
      <rect x={screenX - 9} y={top - 12} width={screenW + 18} height={sh + 24} rx={22} fill={INK} />
      <rect x={screenX} y={top} width={screenW} height={sh} fill="#111" />
      <Hot id="notebook" onPick={onPick} onHover={onHover}>
        <Notebook
          points="148,694 284,694 296,730 136,730"
          lines={[
            [158, 276, 706],
            [152, 282, 718],
          ]}
        />
      </Hot>

      <Lighting W={W} H={H} light={light} golden={golden} glow={{ cx: screenX + screenW / 2, cy: top + sh / 2, rx: screenW * 1.3, ry: sh * 0.9 }} />
      <ClockDigits x={216} y={52} w={190} h={60} time={time} size={34} />
    </svg>
  );
}
