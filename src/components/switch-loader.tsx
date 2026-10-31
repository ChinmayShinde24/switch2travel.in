"use client"

import { useId } from "react"
import Image from "next/image"

type SwitchLoaderProps = {
  height?: number
  label?: string
}

export function SwitchLoader({
  height = 260,
  label = "Loading your trips",
}: SwitchLoaderProps) {
  const rawId = useId().replace(/:/g, "")
  const pill = `${rawId}-pill`
  const rim = `${rawId}-rim`
  const knob = `${rawId}-knob`
  const plane = `${rawId}-plane`
  const pull = `${rawId}-pull`
  const bob = `${rawId}-bob`

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex flex-col items-center gap-3"
    >
      <svg
        height={height}
        viewBox="0 0 140 400"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={pill} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1b2250" />
            <stop offset="1" stopColor="#1f3b7a" />
          </linearGradient>
          <linearGradient id={rim} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2b3a9a" />
            <stop offset="1" stopColor="#1478c0" />
          </linearGradient>
          <radialGradient id={knob} cx="0.4" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#8a96b4" />
            <stop offset="1" stopColor="#4a5675" />
          </radialGradient>
          <linearGradient id={plane} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9362f" />
            <stop offset="1" stopColor="#fdae3b" />
          </linearGradient>
        </defs>

        <g transform="translate(0 400) rotate(-90)">
          <rect x="8" y="25" width="250" height="90" rx="45" fill={`url(#${rim})`} />
          <rect x="16" y="32" width="234" height="76" rx="38" fill={`url(#${pill})`} />

          <g className={pull}>
            <circle cx="62" cy="70" r="31" fill="#c9d0e0" />
            <circle cx="62" cy="70" r="26" fill={`url(#${knob})`} />
            <ellipse cx="50" cy="70" rx="8" ry="14" fill="#b9c3dd" opacity="0.85" />

            <path
              d="M88 50 L132 70 L88 92"
              fill="none"
              stroke="#1b2250"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            <g className={bob} transform="translate(128 70)">
              <path d="M0 -4 L-6 -17 L8 -17 L20 -4 Z" fill="#d9362f" />
              <path d="M0 4 L-6 17 L8 17 L20 4 Z" fill="#fdae3b" />
              <path d="M34 -5 L22 -42 L42 -42 L66 -5 Z" fill="#d9362f" />
              <path d="M34 5 L22 42 L42 42 L66 5 Z" fill="#fdae3b" />
              <path d="M0 -6 L72 -6 Q104 0 72 6 L0 6 Z" fill={`url(#${plane})`} />
            </g>
          </g>
        </g>
      </svg>

      {label ? (
        <div className="mt-1 flex flex-col items-center gap-1.5 text-center">
          <Image
            src="/switch-wordmark.png"
            alt="Switch 2 travel"
            width={280}
            height={40}
            className="h-9 w-auto object-contain sm:h-10"
          />
          <span className="font-editorial text-[1.65rem] leading-none tracking-[0.06em] text-slate-800 sm:text-[1.85rem]">
            {label === "Loading your trips" ? (
              <>
                Loading{" "}
                <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-500 bg-clip-text italic text-transparent">
                  your trips
                </span>
              </>
            ) : (
              label
            )}
          </span>
        </div>
      ) : null}

      <style>{`
        .${pull} {
          animation: ${pull}-move 1.8s cubic-bezier(.6,0,.3,1) infinite;
        }
        .${bob} {
          animation: ${bob}-nudge 0.9s ease-in-out infinite alternate;
        }
        @keyframes ${pull}-move {
          0%   { transform: translateX(0); }
          70%  { transform: translateX(150px); }
          100% { transform: translateX(150px); }
        }
        @keyframes ${bob}-nudge {
          from { transform: translate(128px, 66px); }
          to   { transform: translate(128px, 74px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .${pull}, .${bob} { animation: none; }
        }
      `}</style>
    </div>
  )
}
