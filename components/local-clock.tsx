"use client";

import { useEffect, useState } from "react";

function now() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Denver",
  });
}

/* Live local time for Smithfield, Utah, updating each minute. Renders empty
   on the server so hydration can't mismatch. */
export function LocalClock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(now());
    const raf = requestAnimationFrame(update);
    const tick = setInterval(update, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(tick);
    };
  }, []);

  return <span className={className}>{time}</span>;
}
