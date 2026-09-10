"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".phil-line", {
        y: 80,
        opacity: 0,
        filter: "blur(16px)",
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.to(".phil-shift", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[88vh] items-center overflow-hidden py-28">
      <div className="phil-shift stage">
        <p className="label mb-8">07 — Philosophy</p>
        <h2 className="display text-[14vw] text-white md:text-[7.5vw]">
          <span className="phil-line block">I DON&apos;T JUST</span>
          <span className="phil-line block">WRITE CODE.</span>
          <span className="phil-line mt-8 block text-white/35">I BUILD</span>
          <span className="phil-line block text-white/35">SOLUTIONS.</span>
        </h2>
      </div>
    </section>
  );
}
