import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Hammer,
  Truck,
  Settings,
  BarChart3,
  ShieldCheck,
  Package,
  MessageSquare,
  LifeBuoy,
  ChevronDown,
} from "lucide-react";

// Scoped theme for this section — matching the established global palette
const servicesThemeVars = {
  "--srv-paper": "var(--bone)",
  "--srv-timber": "var(--olive)",
  "--srv-steel": "var(--steel)",
  "--srv-ink": "#211D17",
  "--srv-rust": "var(--green)",
} as CSSProperties;

const services = [

  {
    title: "Technical Consultation",
    description: "Product recommendations and technical guidance to help customers select the most suitable materials and packaging solutions.",
    icon: MessageSquare,
    accent: "steel",
    image: "/src/assets/service1.jpg",
  },
  {
    title: "Manufacturing",
    description: "Custom manufacturing of wooden cable drums, steel cable drums, wooden pallets, and industrial timber products built to meet industry standards and project-specific requirements.",
    icon: Hammer,
    accent: "steel",
    image: "/src/assets/service2.jpg",
  },
  {
    title: "Custom Fabrication",
    description: "Tailor-made products manufactured according to your required dimensions, load capacities, materials, and technical specifications.",
    icon: Settings,
    accent: "steel",
    image: "/src/assets/service3.jpg",
  },
  {
    title: "Supply & Distribution",
    description: "Reliable supply of timber, plywood, MDF boards, marine plywood, wire nails, and industrial packaging materials across the UAE and GCC.",
    icon: Truck,
    accent: "timber",
    image: "/src/assets/service4.jpg",
  },

  {
    title: "Shipping & Logistics",
    description: "Efficient order management, packaging, and transportation to ensure safe and on-time delivery across the GCC.",
    icon: Package,
    accent: "timber",
    image: "/src/assets/service5.jpg",
  },

  {
    title: "After-Sales Support",
    description: "Responsive customer assistance and long-term support to ensure continued satisfaction after project completion.",
    icon: LifeBuoy,
    accent: "timber",
    image: "/src/assets/service6.jpg",
  },
];

// Five distinct divider layouts, one per gap between the 6 rows.
// Each divider is a row of segments — either a visible hairline or a
// transparent spacer of the same height — laid out with a justify rule.
// This intentionally does NOT alternate/repeat; every gap gets its own
// hand-set design, matching the reference layout.
const dividerDesigns = [
  {
    // Row1 -> Row2: short line, gap, long line reaching near the right edge
    justify: "start" as const,
    segments: [
      { width: "25%", visible: true },
      { width: "3%", visible: false },
      { width: "70%", visible: true },
    ],
  },
  {
    // Row2 -> Row3: single short line tucked at the far right
    justify: "end" as const,
    segments: [{ width: "10%", visible: true }],
  },
  {
    // Row3 -> Row4: gap, long line, small gap, tiny line at the end
    justify: "start" as const,
    segments: [
      { width: "13%", visible: false },
      { width: "73%", visible: true },
      { width: "2%", visible: false },
      { width: "12%", visible: true },
    ],
  },
  {
    // Row4 -> Row5: tiny line at the far left, big gap, long line to the right edge
    justify: "start" as const,
    segments: [
      { width: "5%", visible: true },
      { width: "23%", visible: false },
      { width: "70%", visible: true },
    ],
  },
  {
    // Row5 -> Row6: one centered line, even space on both sides
    justify: "center" as const,
    segments: [{ width: "72%", visible: true }],
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

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ServiceItem({ service, isFirst }: { service: (typeof services)[number]; isFirst: boolean }) {
  const Icon = service.icon;

  return (
    <div className={`group py-10 ${isFirst ? "pt-0" : ""}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
        {/* Logo/icon + title — same line */}
        <div className="flex items-center gap-4 md:w-72 md:shrink-0">
          <Icon className="h-5 w-5 shrink-0 text-[color:var(--walnut)]" strokeWidth={1.2} />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.4em] text-[color:var(--walnut)]"
          >
            {service.title}
          </span>
        </div>

        <p className="flex-1 text-base leading-relaxed opacity-75 transition-opacity duration-500 group-hover:opacity-100">
          {service.description}
        </p>

        <ChevronDown
          className="h-4 w-4 shrink-0 self-end text-[color:var(--walnut)] transition-transform duration-500 group-hover:rotate-180 md:self-center"
          strokeWidth={1.5}
        />
      </div>

      {/* Drop-down picture — reveals on hover */}
      <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:mt-8 group-hover:grid-rows-[1fr] group-hover:opacity-100">
        <div className="overflow-hidden rounded-lg">
          <img
            src={service.image}
            alt={service.title}
            className="h-64 w-full object-cover grayscale-[15%] contrast-[1.05] md:h-80"
          />
        </div>
      </div>

    </div>
  );
}

function ServiceDivider({ design }: { design: (typeof dividerDesigns)[number] }) {
  const justifyClass =
    design.justify === "end"
      ? "justify-end"
      : design.justify === "center"
      ? "justify-center"
      : "justify-start";

  return (
    <div className={`flex items-center ${justifyClass}`}>
      {design.segments.map((seg, i) => (
        <div
          key={i}
          style={{ width: seg.width, height: 0 }}
          className={`shrink-0 ${
            seg.visible ? "border-t border-[color:var(--srv-steel)]/20" : "border-t border-transparent"
          }`}
        />
      ))}
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      style={servicesThemeVars}
      className="relative overflow-hidden bg-[color:var(--bone)] text-[color:var(--srv-ink)] px-8 py-20 md:px-20 md:py-32"
    >
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-[color:var(--srv-steel)]" />
        <div className="absolute top-1/4 right-0 w-full h-[1px] bg-[color:var(--srv-steel)]" />
        <div className="absolute top-3/4 right-0 w-full h-[1px] bg-[color:var(--srv-steel)]" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header — matching About section design */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--srv-steel)]">
            02 — Services
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--olive)" }}
          >
            Precision manufacturing with end-to-end support
          </h2>
          <div className="mt-4 h-px w-10 bg-[#454E53]/30" />
        </Reveal>

        {/* List — hover a row to drop down its picture */}
        <div className="space-y-0">
          {services.map((service, index) => {
            const design = dividerDesigns[index]; // undefined after the last row

            return (
              <div key={service.title}>
                <Reveal delay={index * 120}>
                  <ServiceItem service={service} isFirst={index === 0} />
                </Reveal>

                {design && <ServiceDivider design={design} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}