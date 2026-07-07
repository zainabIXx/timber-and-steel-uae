import { useEffect, useRef, useState } from "react";
import app1 from "../assets/app1.jpg";
import app2 from "../assets/app2.jpg";
import app3 from "../assets/app3.jpg";
import app4 from "../assets/app4.jpg";
import app5 from "../assets/app5.jpg";
import app6 from "../assets/app6.jpg";
import app7 from "../assets/app7.jpg";
import app8 from "../assets/app8.jpg";

// Scoped theme — same var names/values as About
const appThemeVars = {
  "--abt-paper": "#F3EEE3",
  "--abt-timber": "#7A5C3E",
  "--abt-steel": "#454E53",
  "--abt-ink": "#211D17",
  "--abt-rust": "#A8502F",
} as React.CSSProperties;

const applications = [
  {
    num: "01",
    title: "Construction",
    desc: "Supplying premium timber, steel, plywood, pallets, and industrial packaging solutions that support residential, commercial, and infrastructure construction projects.",
    img: app1,
  },
  {
    num: "02",
    title: "Infrastructure & Civil Engineering",
    desc: "Providing durable timber, steel products, and engineered solutions for bridges, transportation networks, utility projects, and large-scale civil infrastructure.",
    img: app2,
  },
  {
    num: "03",
    title: "Power & Utilities",
    desc: "Manufacturing reliable wooden and steel cable drums for the safe storage, transport, and handling of power transmission and utility cables.",
    img: app3,
  },
  {
    num: "04",
    title: "Cable & Wire Manufacturing",
    desc: "Supporting cable manufacturers with precision-engineered wooden and steel cable drums built for strength, durability, and efficient cable handling.",
    img: app4,
  },
  {
    num: "05",
    title: "Telecommunications",
    desc: "Delivering dependable cable drum solutions for fiber optic and telecommunications networks, ensuring secure transportation and storage of critical infrastructure cables.",
    img: app5,
  },
  {
    num: "06",
    title: "Furniture Manufacturing",
    desc: "Supplying high-quality plywood, MDF boards, timber, and engineered wood products for furniture manufacturers focused on durability, precision, and fine craftsmanship.",
    img: app6,
  },
  {
    num: "07",
    title: "Joinery & Carpentry",
    desc: "Providing premium timber, plywood, MDF, and fastening solutions that support high-quality joinery, cabinetry, and custom woodworking applications.",
    img: app7,
  },
  {
    num: "08",
    title: "Interior Fit-Out",
    desc: "Offering versatile wood panels, plywood, MDF, and timber products that meet the performance and aesthetic demands of modern interior fit-out projects.",
    img: app8,
  },
];

const AUTOPLAY_MS = 3600;
const TRANSITION_MS = 650;

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
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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

const Applications = () => {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [wipeAngle, setWipeAngle] = useState(360);
  const [progress, setProgress] = useState(0);

  const settledRef = useRef(0);
  const wipeRafRef = useRef<number | null>(null);
  const progressRafRef = useRef<number | null>(null);
  const progressStartRef = useRef<number>(performance.now());

  const count = applications.length;

  const goTo = (index: number) => {
    progressStartRef.current = performance.now();
    setProgress(0);
    setActive(index);
  };

  useEffect(() => {
    const step = (now: number) => {
      const elapsed = now - progressStartRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        const next = (active + 1) % count;
        progressStartRef.current = now;
        setActive(next);
        setProgress(0);
      }

      progressRafRef.current = requestAnimationFrame(step);
    };

    progressRafRef.current = requestAnimationFrame(step);
    return () => {
      if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
    };
  }, [active, count]);

  useEffect(() => {
    if (active === settledRef.current) return;

    setPrevActive(settledRef.current);
    setWipeAngle(0);

    const start = performance.now();
    const stepWipe = (now: number) => {
      const p = Math.min((now - start) / TRANSITION_MS, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setWipeAngle(eased * 360);

      if (p < 1) {
        wipeRafRef.current = requestAnimationFrame(stepWipe);
      } else {
        settledRef.current = active;
      }
    };

    wipeRafRef.current = requestAnimationFrame(stepWipe);
    return () => {
      if (wipeRafRef.current) cancelAnimationFrame(wipeRafRef.current);
    };
  }, [active]);

  const wipeMask = `conic-gradient(from 0deg at 50% 50%, #000 0deg ${wipeAngle}deg, transparent ${wipeAngle}deg 360deg)`;

  return (
    <section
      id="applications"
      style={appThemeVars}
      className="relative bg-bone text-[color:var(--abt-ink)] px-8 py-20 md:px-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header — matching About's structural hierarchy */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--abt-steel)]">
            03 — Markets We Serve
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--olive)" }}
          >
            Serving industries throughout the region.
          </h2>
          <div className="mt-4 h-px w-10 bg-[color:var(--abt-steel)]/30" />
        </Reveal>

        {/* Section 1: Industrial Coverage */}
        <Reveal className="grid md:grid-cols-2 gap-16 items-center mb-32" delay={120}>
          {/* Rotating image circle */}
          <div className="relative mx-auto w-full max-w-[440px] aspect-square group">


            <div className="absolute inset-[6%] rounded-full bg-foreground/5 translate-x-3 translate-y-3" />
            <div className="absolute inset-0 rounded-full ring-1 ring-[color:var(--abt-steel)]/15 pointer-events-none" />

            <div className="absolute inset-0 rounded-full overflow-hidden border border-[color:var(--abt-steel)]/30 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              <img
                src={applications[prevActive].img}
                alt={applications[prevActive].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <img
                src={applications[active].img}
                alt={applications[active].title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  WebkitMaskImage: wipeMask,
                  maskImage: wipeMask,
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center">
            <div className="relative min-h-[160px] pt-6">
              {applications.map((application, i) => (
                <div
                  key={application.num}
                  className={`transition-all duration-500 ease-in-out ${
                    i === active
                      ? "opacity-100 translate-y-0 relative"
                      : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <div className="relative pl-1">
                    <span
                      className="absolute -left-2 -top-10 select-none text-[5rem] leading-none opacity-[0.12] pointer-events-none"
                      style={{ fontFamily: "var(--font-display)", color: "var(--beige)" }}
                    >
                      {application.num}
                    </span>

                    <span className="block font-mono text-[11px] uppercase tracking-[0.4em] text-[color:var(--walnut)] mb-4">
                      {application.title}
                    </span>

                    <p className="text-base leading-relaxed opacity-75 max-w-md">
                      {application.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel dashes — olive/walnut accent, restored original size */}
            <div className="flex items-center gap-2 mt-6 pl-1">
              {applications.map((application, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={application.num}
                    onClick={() => goTo(i)}
                    aria-current={isActive}
                    aria-label={application.title}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-6 bg-[color:var(--olive)]"
                        : "w-3 bg-[color:var(--walnut)]/40 hover:bg-[color:var(--walnut)]/60"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Section 2: Regional Reach — Premium styling matching About's "The Vision" */}
        <Reveal className="relative mt-24 pt-16 border-t border-[color:var(--abt-steel)]/10" delay={200}>
          <div className="max-w-3xl">
            <div className="absolute -top-8 -left-4 pointer-events-none">
              <div className="w-12 h-[1px] bg-[color:var(--abt-timber)]/30" />
              <div className="w-[1px] h-32 bg-[color:var(--abt-timber)]/30" />
            </div>

            <div className="relative pl-6 group">
              <div className="relative flex items-center gap-3 mb-6">
                <span className="h-1 w-3 bg-[color:var(--abt-timber)]/40 transition-all duration-500 group-hover:w-6" />
                <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[color:var(--abt-timber)]">
                  Regional Reach
                </span>
              </div>

              <h3
                className="text-xl md:text-2xl tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--olive)" }}
              >
                Connecting the GCC with Industrial Excellence
              </h3>

              <p className="text-base leading-relaxed opacity-75 text-[color:var(--abt-ink)] max-w-2xl">
                With a strong regional supply network, we serve customers across the United Arab Emirates, Saudi Arabia, Oman, Qatar, Kuwait, and Bahrain, delivering quality products backed by reliable logistics.
              </p>

              <div className="mt-10 h-[1px] w-24 bg-[color:var(--abt-timber)]/20" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Applications;