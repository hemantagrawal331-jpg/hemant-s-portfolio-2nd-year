"use client";

export function HeroNetwork() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] lg:ml-auto lg:max-w-none" aria-hidden>
      <svg viewBox="0 0 320 220" className="h-auto w-full text-ink">
        <defs>
          <linearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.38" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <circle cx="160" cy="108" r="78" fill="none" stroke="currentColor" strokeOpacity="0.06" />
        <circle cx="160" cy="108" r="54" fill="none" stroke="currentColor" strokeOpacity="0.05" />

        <path
          className="network-path"
          d="M86 64 L160 108 L234 64"
          fill="none"
          stroke="url(#edge)"
          strokeWidth="1.2"
        />
        <path
          className="network-path"
          d="M160 108 L160 176"
          fill="none"
          stroke="url(#edge)"
          strokeWidth="1.2"
        />
        <path
          className="network-path delay"
          d="M86 64 L160 176 L234 64"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />

        <circle r="2.2" fill="currentColor">
          <animateMotion dur="8s" repeatCount="indefinite" path="M86 64 L160 108 L234 64 L160 176 Z" />
        </circle>

        <g>
          <circle cx="160" cy="108" r="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle className="node-pulse" cx="160" cy="108" r="22" fill="none" stroke="currentColor" />
          <circle cx="160" cy="108" r="3.5" fill="currentColor" />
        </g>

        <g>
          <circle cx="86" cy="64" r="7" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="86" cy="64" r="2.4" fill="currentColor" />
          <text x="86" y="48" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill="currentColor">
            AI / ML
          </text>
        </g>
        <g>
          <circle cx="234" cy="64" r="7" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="234" cy="64" r="2.4" fill="currentColor" />
          <text x="234" y="48" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill="currentColor">
            AUTOMATION
          </text>
        </g>
        <g>
          <circle cx="160" cy="176" r="7" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="160" cy="176" r="2.4" fill="currentColor" />
          <text x="160" y="198" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill="currentColor">
            SOFTWARE QUALITY
          </text>
        </g>
      </svg>
    </div>
  );
}
