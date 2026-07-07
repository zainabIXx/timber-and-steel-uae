import { useEffect, useRef, useState } from "react";

// Scoped theme for this section
const aboutThemeVars = {
  "--abt-paper": "#F3EEE3",
  "--abt-timber": "#7A5C3E",
  "--abt-steel": "#454E53",
  "--abt-ink": "#211D17",
  "--abt-rust": "#A8502F",
} as React.CSSProperties;

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

export function About() {
  return (
    <section
      id="about"
      style={aboutThemeVars}
      className="relative bg-[color:var(--white)] text-[color:var(--abt-ink)] px-8 py-20 md:px-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--abt-steel)]">
            01 — About
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--olive)" }}
          >
            Our story of Quality, Reliability, and Growth
          </h2>
          <div className="mt-4 h-px w-10 bg-[color:var(--abt-steel)]/30" />
        </Reveal>

        {/* Clean Grid Alignment with Varied L-Accent Placement */}
        <div className="grid gap-12 md:grid-cols-3 items-stretch">
          
          {/* Column 1: Profile - Top-Left Accent */}
          <Reveal delayMs={0} className="relative group flex flex-col">
            {/* L-Accent: Top-Left */}
            <div className="absolute -top-8 -left-4 pointer-events-none">
              <div className="w-12 h-[1px] bg-[color:var(--abt-steel)]/30 transition-all duration-700 group-hover:w-24 group-hover:bg-[color:var(--abt-steel)]" />
              <div className="w-[1px] h-32 bg-[color:var(--abt-steel)]/30 transition-all duration-700 group-hover:h-48 group-hover:bg-[color:var(--abt-steel)]" />
            </div>

            <div className="relative pl-6 pt-4 flex-grow">
              <span
                className="absolute -left-10 -top-12 select-none text-[5rem] leading-none opacity-[0.12] pointer-events-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--beige)" }}
              >
                01
              </span>
              <div className="relative flex items-center gap-3 mb-6">
                <span className="h-1 w-3 bg-[color:var(--abt-steel)]/40" />
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.4em]"
                  style={{ color: "var(--walnut)" }}
                >
                  The Profile
                </span>
              </div>
              <p className="text-base leading-relaxed opacity-75 group-hover:opacity-100 transition-opacity duration-500">
                Timber & Steel Corner Industries LLC is a trusted manufacturer, supplier, and trader of premium timber, steel, and industrial packaging solutions. Operating from Sharjah, UAE, we proudly serve customers across the GCC with quality products, precision manufacturing, dependable logistics, and exceptional customer service.
              </p>
            </div>
          </Reveal>

          {/* Column 2: Vision - Bottom-Right Accent */}
          <Reveal delayMs={150} className="relative group flex flex-col">
            {/* L-Accent: Bottom-Right (Unexpected placement) */}
            <div className="absolute -bottom-8 -right-4 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-[color:var(--abt-timber)]/30 transition-all duration-700 group-hover:w-48 group-hover:bg-[color:var(--abt-timber)]" />
              <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-[color:var(--abt-timber)]/30 transition-all duration-700 group-hover:h-24 group-hover:bg-[color:var(--abt-timber)]" />
            </div>

            <div className="relative pl-6 pt-4 flex-grow">
              <span
                className="absolute -left-10 -top-12 select-none text-[5rem] leading-none opacity-[0.12] pointer-events-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--beige)" }}
              >
                02
              </span>
              <div className="relative flex items-center gap-3 mb-6">
                <span className="h-1 w-3 bg-[color:var(--abt-timber)]/40" />
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.4em]"
                  style={{ color: "var(--walnut)" }}
                >
                  The Vision
                </span>
              </div>
              <p className="text-base leading-relaxed opacity-75 group-hover:opacity-100 transition-opacity duration-500">
                To become the GCC's preferred industrial partner by setting new benchmarks in quality, innovation, and reliability. We aspire to build lasting relationships through excellence in manufacturing, responsible business practices, and an unwavering commitment to customer success.
              </p>
            </div>
          </Reveal>

          {/* Column 3: Mission - Top-Right Accent */}
          <Reveal delayMs={300} className="relative group flex flex-col">
            {/* L-Accent: Top-Right (Unexpected placement) */}
            <div className="absolute -top-8 -right-4 pointer-events-none">
              <div className="absolute top-0 right-0 w-16 h-[1px] bg-[color:var(--abt-steel)]/30 transition-all duration-700 group-hover:w-32 group-hover:bg-[color:var(--abt-steel)]" />
              <div className="absolute top-0 right-0 w-[1px] h-40 bg-[color:var(--abt-steel)]/10 transition-all duration-700 group-hover:h-56 group-hover:bg-[color:var(--abt-steel)]/40" />
            </div>

            <div className="relative pl-6 pt-4 flex-grow">
              <span
                className="absolute -left-10 -top-12 select-none text-[5rem] leading-none opacity-[0.12] pointer-events-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--beige)" }}
              >
                03
              </span>
              <div className="relative flex items-center gap-3 mb-6">
                <span className="h-1 w-3 bg-[color:var(--abt-steel)]/40" />
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.4em]"
                  style={{ color: "var(--walnut)" }}
                >
                  The Mission
                </span>
              </div>
              <p className="text-base leading-relaxed opacity-75 group-hover:opacity-100 transition-opacity duration-500">
                To deliver high-quality timber, steel, and industrial packaging solutions through advanced manufacturing, efficient supply chain management, and customer-focused service. We are committed to maintaining the highest standards of quality, integrity, safety, and sustainability while creating long-term value for our customers and partners.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}