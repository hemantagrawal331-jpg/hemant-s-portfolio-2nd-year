"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const update = () => {
      const nodes = ids
        .map((id) => document.getElementById(id.replace("#", "")))
        .filter((node): node is HTMLElement => Boolean(node))
        .sort((a, b) => a.offsetTop - b.offsetTop);
      if (!nodes.length) return;

      const offset = 96;
      let current = "";
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= offset) current = `#${node.id}`;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return active;
}
