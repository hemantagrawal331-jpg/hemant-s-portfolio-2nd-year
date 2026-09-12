"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useTypedLine(text: string, enabled: boolean, speed = 32) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? text : "");

  useEffect(() => {
    if (!enabled) {
      setValue("");
      return;
    }
    if (reduce) {
      setValue(text);
      return;
    }

    setValue("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, enabled, reduce, speed]);

  return value;
}
