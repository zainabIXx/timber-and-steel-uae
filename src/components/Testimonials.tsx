import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Quote } from "lucide-react";

// Scoped theme — sourced from the same global palette as Contact.tsx / About.tsx
// Note: --tst-timber already resolves to var(--olive), so anywhere this
// section wants an olive accent (name, active dash, heading) it just reaches
// for var(--tst-timber) rather than hardcoding the color a second time.
const testimonialsThemeVars = {
  "--tst-paper": "var(--bone)",
  "--tst-timber": "var(--olive)",
  "--tst-steel": "var(--steel)",
  "--tst-ink": "var(--walnut)",
  "--tst-rust": "var(--green)",
  "--tst-ash": "var(--ash)",
  "--tst-beige": "var(--color-beige)",
} as CSSProperties;

// Three accents available in this section's theme — cycled per testimonial
// so the carousel doesn't read as one flat color the whole way through.
const accentColors = {
  timber: "var(--tst-timber)", // olive
  steel: "var(--tst-steel)",
  rust: "var(--tst-rust)", // green
} as const;

type Accent = keyof typeof accentColors;

const testimonials: { name: string; role: string; quote: string; accent: Accent }[] = [
  {
    name: "Ahmed Al Mansoori",
    role: "Procurement Manager, UAE Construction Company",
    quote:
      "Timber & Steel Corner Industries has consistently delivered high-quality materials on time. Their professionalism, competitive pricing, and dependable service have made them one of our most trusted suppliers.",
    accent: "timber",
  },
  {
    name: "Khalid Al Nuaimi",
    role: "Operations Manager, Industrial Packaging & Logistics",
    quote:
      "We've worked with TSC on multiple projects, and their attention to quality and customer service has always exceeded our expectations. Their team is responsive, knowledgeable, and committed to delivering exactly what we need.",
    accent: "steel",
  },
  {
    name: "Omar Al Mazrouei",
    role: "Project Engineer, Infrastructure Solutions",
    quote:
      "From structural steel to timber products, every order has met our specifications with exceptional quality. Their reliability and consistency have made them a valuable long-term partner for our business.",
    accent: "rust",
  },
  {
    name: "Mohammed Al Suwaidi",
    role: "Supply Chain Manager, Manufacturing Company",
    quote:
      "What sets TSC apart is their ability to deliver customized solutions without compromising on quality or timelines. Their commitment to excellence is evident in every project we've completed together.",
    accent: "timber",
  },
  {
    name: "Abdullah Al Shamsi",
    role: "Director of Procurement, GCC Trading Group",
    quote:
      "TSC combines premium products with outstanding customer support. Their expertise, efficient delivery, and transparent communication give us complete confidence in every order we place.",
    accent: "steel",
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

// Brought in line with About / WhyUs's Reveal: same delayMs prop and the
// same conditional transitionDelay (only applied once visible).
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

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setFading(false);
      }, 400);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => {
    if (i === index) return;
    setFading(true);
    setTimeout(() => {
      setIndex(i);
      setFading(false);
    }, 400);
  };

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      style={testimonialsThemeVars}
      className="relative bg-[color:var(--tst-paper)] text-[color:var(--tst-ink)] px-8 py-20 md:px-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header — matches About's treatment exactly: font-mono label, h2 sizing/font/color, underline rule */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--tst-steel)]">
            05 — Testimonials
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--tst-timber)" }}
          >
            Trusted by Those We Serve
          </h2>
          <div className="mt-4 h-px w-10 bg-[color:var(--tst-steel)]/30" />
        </Reveal>

        {/* Rotating single-quote carousel */}
        <Reveal>
          <div className="relative mx-auto max-w-3xl px-8 md:px-16">
            {/* Opening quote mark — beige */}
            <Quote
              className="absolute -top-2 left-0 h-12 w-12 md:h-20 md:w-20 opacity-[0.06] md:-top-4"
              style={{ color: "var(--tst-beige)" }}
              strokeWidth={1}
              fill="currentColor"
            />
            {/* Closing quote mark — mirrored, bottom-right, also beige */}
            <Quote
              className="absolute -bottom-2 right-0 h-12 w-12 rotate-180 md:h-20 md:w-20 opacity-[0.06] md:-bottom-4"
              style={{ color: "var(--tst-beige)" }}
              strokeWidth={1}
              fill="currentColor"
            />

            <div
              className={`text-center transition-all duration-500 ease-out ${
                fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {/* Quote copy — ash-colored, sized to match WhyUs's card description (text-base) */}
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--tst-ash)" }}
              >
                {current.quote}
              </p>

              <div className="mt-8">
                {/* Name — same treatment as WhyUs's value labels: font-mono, 11px, uppercase, wide tracking, olive */}
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.4em]"
                  style={{ color: "var(--tst-timber)" }}
                >
                  {current.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed opacity-60">{current.role}</span>
              </div>
            </div>
          </div>

          {/* Progress dashes — olive */}
          <div className="mt-14 flex items-center justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => goTo(i)}
                className="group py-2"
              >
                <span
                  className="block h-[3px] transition-all duration-300"
                  style={{
                    width: i === index ? "28px" : "12px",
                    backgroundColor:
                      i === index ? "var(--tst-timber)" : "color-mix(in srgb, var(--tst-timber) 30%, transparent)",
                  }}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}