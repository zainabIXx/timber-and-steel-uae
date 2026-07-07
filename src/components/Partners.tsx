import { useEffect, useRef, useState, type CSSProperties } from "react";

import logo1 from "@/assets/logo.jpeg";
import logo2 from "@/assets/logo2.jpeg";
import logo3 from "@/assets/logo3.jpeg";
import logo4 from "@/assets/Logo4.png";

// Scoped theme for this section — brought in line with About / Testimonials,
// now sourced from the same global palette instead of hardcoded hex.
const partnersThemeVars = {
  "--ptn-paper": "var(--bone)",
  "--ptn-timber": "var(--olive)",
  "--ptn-steel": "var(--steel)",
  "--ptn-ink": "var(--walnut)",
  "--ptn-rust": "var(--green)",
  "--ptn-walnut": "var(--walnut)",
} as CSSProperties;

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

// Same delayMs pattern as About / Testimonials so staggered reveals stay consistent site-wide.
function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const partners = [
  { src: logo1, name: "One Globe Trading FZE" },
  { src: logo2, name: "Highland Trading FZE LLC" },
  { src: logo3, name: "SAT" },
  { src: logo4, name: "Zahra Steel" },
];

export function Partners() {
  return (
    <section
      id="partners"
      style={partnersThemeVars}
      className="relative bg-[color:var(--white)] text-[color:var(--ptn-ink)] px-8 py-20 md:px-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header — matches About / Testimonials treatment exactly */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--ptn-steel)]">
            06 — Partners
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--ptn-timber)" }}
          >
            Partnerships That Drive Excellence
          </h2>
          <div className="mt-4 h-px w-10 bg-[color:var(--ptn-steel)]/30" />
        </Reveal>

        {/* Logo grid — each tile staggers in on its own delay, and scales cleanly on hover */}
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-4 md:gap-20">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delayMs={i * 120} className="group flex flex-col items-center justify-center gap-5">
              <div className="flex h-20 w-full items-center justify-center md:h-24">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain opacity-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              {/* Company name — 11px, walnut, same font-mono/tracking treatment as Testimonials' name label */}
              <span
                className="text-center font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "var(--ptn-walnut)" }}
              >
                {partner.name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}