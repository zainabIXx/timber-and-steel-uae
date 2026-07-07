import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Gem,
  ShieldCheck,
  CircleCheckBig,
  Lightbulb,
  HeartHandshake,
  TrendingUp,
  HardHat,
  Leaf,
  type LucideIcon,
} from "lucide-react";

// Scoped theme for this section — values mirror About's --abt-* palette
// exactly, so headings, accents, and body copy read as one continuous
// system across sections rather than two similar-but-different palettes.
const whyThemeVars = {
  "--why-paper": "#ffffff",
  "--why-timber": "#7A5C3E",
  "--why-steel": "#454E53",
  "--why-ink": "#211D17",
  "--why-rust": "#A8502F",
} as CSSProperties;

// Static class lookup — Tailwind's build-time scanner can only pick up class
// names that appear verbatim in the source. Interpolating `${value.color}`
// into a class string (the old approach) produces a string Tailwind never
// sees, so no CSS gets generated for it. Every branch here is written out in
// full so both "steel" and "timber" variants are always present in the file.
const colorClasses = {
  steel: {
    text: "text-[color:var(--why-steel)]",
    line: "bg-[color:var(--why-steel)]/30",
    lineHover: "group-hover:bg-[color:var(--why-steel)]",
    iconBg: "bg-[color:var(--why-steel)]/5",
    iconBgHover: "group-hover:bg-[color:var(--why-steel)]/10",
    iconText: "text-[color:var(--why-steel)]",
  },
  timber: {
    text: "text-[color:var(--why-timber)]",
    line: "bg-[color:var(--why-timber)]/30",
    lineHover: "group-hover:bg-[color:var(--why-timber)]",
    iconBg: "bg-[color:var(--why-timber)]/5",
    iconBgHover: "group-hover:bg-[color:var(--why-timber)]/10",
    iconText: "text-[color:var(--why-timber)]",
  },
} as const;

// Unified core values with descriptions and a representative icon
const coreValues: {
  label: string;
  description: string;
  color: keyof typeof colorClasses;
  icon: LucideIcon;
}[] = [
  {
    label: "Quality",
    description: "Premium materials and expert craftsmanship in every product we deliver.",
    color: "steel",
    icon: Gem,
  },
  {
    label: "Integrity",
    description: "Transparent dealings and honest communication with every partner and client.",
    color: "timber",
    icon: ShieldCheck,
  },
  {
    label: "Reliability",
    description: "Consistent performance, on-time delivery, and unwavering commitment to excellence.",
    color: "steel",
    icon: CircleCheckBig,
  },
  {
    label: "Innovation",
    description: "Continuous improvement and adoption of modern solutions to serve you better.",
    color: "timber",
    icon: Lightbulb,
  },
  {
    label: "Customer Satisfaction",
    description: "Your success is our success — personalised service tailored to your needs.",
    color: "steel",
    icon: HeartHandshake,
  },
  {
    label: "Continuous Improvement",
    description: "We evolve our processes and capabilities to stay ahead of industry standards.",
    color: "timber",
    icon: TrendingUp,
  },
  {
    label: "Safety",
    description: "Rigorous safety protocols protect our team, our clients, and the environment.",
    color: "steel",
    icon: HardHat,
  },
  {
    label: "Sustainability",
    description: "Responsible sourcing and eco-conscious practices for a better future.",
    color: "timber",
    icon: Leaf,
  },
];

// Eight bespoke corner-accent placements — one per item, no repeats. Extends
// the L-accent language from About (top-left / bottom-right / top-right)
// with enough corner + proportion variety that row 1 and row 2 never land on
// the same treatment in the same column.
const accentVariants: ({ wrapper: string; h: string; v: string } | null)[] = [
  // index 0 — top-left, tall
  {
    wrapper: "-top-8 -left-4",
    h: "top-0 left-0 w-12 h-[1px] group-hover:w-24",
    v: "top-0 left-0 w-[1px] h-32 group-hover:h-48",
  },
  // index 1 — bottom-right, long & low
  {
    wrapper: "-bottom-8 -right-4",
    h: "bottom-0 right-0 w-28 h-[1px] group-hover:w-44",
    v: "bottom-0 right-0 w-[1px] h-12 group-hover:h-24",
  },
  // index 2 — Reliability: no accent
  null,
  // index 3 — bottom-left, compact
  {
    wrapper: "-bottom-8 -left-4",
    h: "bottom-0 left-0 w-10 h-[1px] group-hover:w-20",
    v: "bottom-0 left-0 w-[1px] h-20 group-hover:h-36",
  },
  // index 4 — bottom-right, tall & narrow (different corner + proportions than row 1's col 0)
  {
    wrapper: "-bottom-8 -right-4",
    h: "bottom-0 right-0 w-16 h-[1px] group-hover:w-32",
    v: "bottom-0 right-0 w-[1px] h-36 group-hover:h-52",
  },
  // index 5 — Continuous Improvement: no accent
  null,
  // index 6 — bottom-left, tall & minimal
  {
    wrapper: "-bottom-8 -left-4",
    h: "bottom-0 left-0 w-8 h-[1px] group-hover:w-16",
    v: "bottom-0 left-0 w-[1px] h-40 group-hover:h-56",
  },
  // index 7 — top-right, long & low
  {
    wrapper: "-top-8 -right-4",
    h: "top-0 right-0 w-24 h-[1px] group-hover:w-40",
    v: "top-0 right-0 w-[1px] h-14 group-hover:h-26",
  },
];

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

// Matches About's Reveal implementation exactly: same prop name (delayMs),
// same conditional transitionDelay (only applied once visible, so the delay
// never fires on the way out), same duration/easing/translate distance —
// so both sections animate on scroll identically.
function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
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

export function WhyUs() {
  return (
    <section
      id="why-us"
      style={whyThemeVars}
      className="relative bg-[color:var(--why-paper)] text-[color:var(--why-ink)] px-8 py-20 md:px-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--why-steel)]">
            04 — Why Us
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--olive)" }}
          >
            Committed to excellence in every delivery.
          </h2>
          <div className="mt-4 h-px w-10 bg-[color:var(--why-steel)]/30" />
        </Reveal>

        {/* Unified Core Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20">
          {coreValues.map((value, index) => {
            const c = colorClasses[value.color];
            const accent = accentVariants[index];
            const Icon = value.icon;

            return (
              <Reveal key={value.label} delayMs={index * 50}>
                <div className="group relative flex flex-col h-full">
                  {/* Corner accent — unique per item, no two cards match (some intentionally have none) */}
                  {accent && (
                    <div className={`absolute ${accent.wrapper} pointer-events-none`}>
                      <div className={`absolute ${accent.h} ${c.line} ${c.lineHover} transition-all duration-700`} />
                      <div className={`absolute ${accent.v} ${c.line} ${c.lineHover} transition-all duration-700`} />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative pl-6 pt-4 flex-grow">
                    {/* Icon badge */}
                    <span
                      className={`relative flex h-11 w-11 items-center justify-center ${c.iconBg} ${c.iconBgHover} transition-colors duration-500`}
                    >
                      <Icon className={`h-5 w-5 ${c.iconText}`} strokeWidth={1.2} />
                    </span>

                    {/* Value label — 11px across the board (Quality, Integrity, etc.) */}
                    <span
                      className={`relative mt-5 mb-2 block font-mono text-[11px] uppercase tracking-[0.4em] ${c.text} transition-colors duration-500`}
                    >
                      {value.label}
                    </span>

                    {/* Description — text-base to match the body copy size used
                        in About and Product Line (previously text-sm, which
                        read a shade smaller than the rest of the page) */}
                    <p className="relative text-base leading-relaxed opacity-75 transition-opacity duration-500 group-hover:opacity-100">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}