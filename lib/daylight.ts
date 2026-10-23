/* Real daylight for the virtual office: how high the sun is over Smithfield,
   Utah right now, turned into a 0..1 light level the desk scene paints with.
   Low-precision solar position (good to a fraction of a degree), which is
   plenty for deciding how dusky a wall looks. */

export const SMITHFIELD = { lat: 41.8383, lon: -111.8327 };
export const OFFICE_TZ = "America/Denver";

const RAD = Math.PI / 180;

/* Sun elevation in degrees above the horizon at `time` for a lat/lon */
export function sunElevation(time: number, lat = SMITHFIELD.lat, lon = SMITHFIELD.lon) {
  const d = time / 86_400_000 + 2440587.5 - 2451545.0;
  const g = (357.529 + 0.98560028 * d) * RAD;
  const q = 280.459 + 0.98564736 * d;
  const L = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD;
  const e = (23.439 - 0.00000036 * d) * RAD;
  const ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L));
  const dec = Math.asin(Math.sin(e) * Math.sin(L));
  const gmst = 18.697374558 + 24.06570982441908 * d;
  const H = (gmst * 15 + lon) * RAD - ra;
  const phi = lat * RAD;
  return (
    Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)) / RAD
  );
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => n * n * (3 - 2 * n);

/* light: 0 at full night (sun 6° below, end of civil twilight), 1 once the
   sun is 8° up. golden: peaks right at the horizon for the sunset glow. */
export function daylight(time: number) {
  const elev = sunElevation(time);
  return {
    elev,
    light: smooth(clamp01((elev + 6) / 14)),
    golden: clamp01(1 - Math.abs(elev - 1) / 7),
  };
}

/* The office's wall-clock hour (0..24, fractional) for an instant */
export function officeHour(time: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: OFFICE_TZ,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(time);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get("hour") + get("minute") / 60;
}

/* The instant today (in the office's timezone) that reads `hour` on its
   wall clock. Used by the prototype's time-of-day scrubber. */
export function officeTimeAt(hour: number, now = Date.now()) {
  return now + (hour - officeHour(now)) * 3_600_000;
}

export function formatOfficeTime(time: number) {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: OFFICE_TZ,
  });
}

/* Linear blend between two #rrggbb colors */
export function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift: number) => {
    const x = (pa >> shift) & 255;
    const y = (pb >> shift) & 255;
    return Math.round(x + (y - x) * t);
  };
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}
