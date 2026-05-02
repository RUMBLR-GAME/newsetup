"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  className?: string;
};

export default function CountUp({
  to,
  from = 0,
  duration = 1.2,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = false,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(from);
  const [display, setDisplay] = useState<string>(formatNumber(from));

  function formatNumber(n: number) {
    const fixed = n.toFixed(decimals);
    if (!separator) return fixed;
    const [whole, dec] = fixed.split(".");
    const withSep = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return dec ? `${withSep}.${dec}` : withSep;
  }

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo style — fast start, gentle finish
    });
    const unsubscribe = motionVal.on("change", (latest) => {
      setDisplay(formatNumber(latest));
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
