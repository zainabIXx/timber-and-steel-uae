import { useEffect, useRef, useState } from "react";
import p1a from "@/assets/product1a.jpg";
import p1b from "@/assets/product1b.jpg";
import p1c from "@/assets/product1c.jpg";
import p2a from "@/assets/product2a.jpeg";
import p2b from "@/assets/product2b.jpeg";
import p2c from "@/assets/product2c.jpg";
import p3a from "@/assets/product3a.jpg";
import p3b from "@/assets/product3b.jpg";
import p3c from "@/assets/product3c.jpg";
import p4a from "@/assets/product4a.jpg";
import p4b from "@/assets/product4b.jpg";
import p4c from "@/assets/product4c.jpg";
import p5a from "@/assets/product5a.jpeg";
import p5b from "@/assets/product5b.jpeg";
import p5c from "@/assets/product5c.jpeg";
import p6a from "@/assets/product6a.jpeg";
import p6b from "@/assets/product6b.jpeg";
import p6c from "@/assets/product6c.jpeg";
import p7a from "@/assets/product7a.jpeg";
import p7b from "@/assets/product7b.jpeg";
import p7c from "@/assets/product7c.jpeg";

const categories = [
  {
    num: "01",
    title: "Wooden Cable Drums",
    description:
      "High-quality wooden cable drums engineered for the safe storage, transportation, and handling of electrical, telecommunication, fiber optic, and industrial cables. Built from premium-grade timber for exceptional strength and durability, in standard and custom sizes.",
    tags: [
      "Electrical Cables",
      "Power Cables",
      "Fiber Optic",
      "Telecommunication",
    ],
    images: [p1a, p1b, p1c],
  },
  {
    num: "02",
    title: "Steel Cable Drums",
    description:
      "Engineered for the safe storage, winding, and transportation of heavy-duty power, telecommunications, and industrial cables. Manufactured from high-quality steel for superior strength and a long service life, available in standard and custom sizes.",
    tags: ["Power Cables", "Industrial Cables", "Heavy-Duty Winding"],
    images: [p2a, p2b, p2c],
  },
  {
    num: "03",
    title: "Wooden Pallets",
    description:
      "Durable softwood and hardwood pallets built for strength, stability, and long service life in demanding industrial environments. Standard and custom sizes available, with ISPM 15 heat-treated options for international shipping compliance.",
    tags: ["Logistics", "Warehousing", "Manufacturing", "Export", "ISPM 15"],
    images: [p3a, p3b, p3c],
  },
  {
    num: "04",
    title: "Commercial Plywood",
    description:
      "High-quality plywood in multiple thicknesses — 9mm, 12mm, 18mm and more — offered in single press (MR grade) for interior furniture and joinery, and double press (BWR/BWP grade) for kitchens, wardrobes, and semi-exterior use.",
    tags: ["9 / 12 / 18mm", "MR Grade", "BWR / BWP Grade", "Furniture & Joinery"],
    images: [p4a, p4b, p4c],
  },
  {
    num: "05",
    title: "Marine Plywood & MDF Boards",
    description:
      "Marine plywood with strong waterproof BWP-grade bonding for kitchens, bathrooms, and marine or high-humidity applications. MDF boards offer a smooth, uniform surface for furniture, decorative panels, and interior fit-outs.",
    tags: ["BWP Grade", "Furniture & Cabinets", "Interior Fit-Outs"],
    images: [p5a, p5b, p5c],
  },
  {
    num: "06",
    title: "Timber",
    description:
      "Pine, hardwood, and softwood timber for construction, manufacturing, and industrial use — from lightweight, workable pine to dense, wear-resistant hardwood and cost-effective softwood for framing and formwork.",
    tags: ["Pine Timber", "Hardwood", "Softwood", "Framing & Formwork"],
    images: [p6a, p6b, p6c],
  },
  {
    num: "07",
    title: "Wire Nails",
    description:
      "High-quality steel wire nails for construction, woodworking, carpentry, and packaging — offering excellent grip, durability, and bend resistance. Available in multiple sizes and finishes for industrial and commercial use.",
    tags: ["Timber Fixing", "Pallet Assembly", "Crate Manufacturing", "Formwork"],
    images: [p7a, p7b, p7c],
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
      { threshold: 0.15 }
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function HorizontalImages({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-2.5 md:gap-3 w-full">
      {images.map((src, i) => (
        <div
          key={i}
          className="aspect-square w-full overflow-hidden rounded-xl shadow-sm bg-[color:var(--foreground)]/5 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ aspectRatio: "1 / 1", transitionDelay: `${i * 60}ms` }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export function ProductLine() {
  return (
    <section
      id="product-line"
      className="relative bg-[color:var(--color-white)] text-[color:var(--foreground)] px-8 py-20 md:px-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Minimalistic Header */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--steel)]">
            03 — Portfolio
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)",color: "var(--olive)" }}
          >
            Engineered products that stand the test of time
          </h2>
          <div className="mt-4 h-px w-10 bg-[#454E53]/30" />
        </Reveal>

        <div className="space-y-24 md:space-y-36">
          {categories.map((cat, i) => {
            const isImageLeft = i % 2 === 0;

            return (
              <div key={cat.num}>
                <Reveal className="group" delay={(i % 2) * 120}>
                  <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
                    {/* Image Side */}
                    <div className={`w-full ${isImageLeft ? "md:order-1" : "md:order-2"}`}>
                      <HorizontalImages images={cat.images} />
                    </div>

                    {/* Text Side */}
                    <div
                      className={`relative flex flex-col w-full ${
                        isImageLeft ? "md:order-2 md:items-start" : "md:order-1 md:items-end md:text-right"
                      }`}
                    >
                      {/* Overlapping Number */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute -top-6 select-none text-[3rem] leading-none opacity-[0.14] md:-top-7 md:text-[4.25rem] ${
                          isImageLeft ? "-left-1 md:-left-2" : "-right-1 md:-right-2"
                        }`}
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--beige)",
                        }}
                      >
                        {cat.num}
                      </span>

                      {/* Heading with Dash Alignment (matches About section's dash style) */}
                      <div
                        className={`relative flex items-center gap-3 ${
                          isImageLeft ? "" : "flex-row-reverse"
                        }`}
                      >
                        <span
                          className="h-1 w-3 transition-all duration-500 group-hover:w-6"
                          style={{ backgroundColor: "var(--walnut)", opacity: 0.4 }}
                        />
                        <span
                          className="font-mono text-[11px] uppercase tracking-[0.4em]"
                          style={{ color: "var(--walnut)" }}
                        >
                          {cat.title}
                        </span>
                      </div>

                      {/* Paragraph */}
                      <p className="relative mt-3 text-base leading-relaxed text-[color:var(--abt-ink)] opacity-75 w-full max-w-md">
                        {cat.description}
                      </p>

                      {/* Tags - separated by dots */}
                      <ul
                        className={`relative mt-5 flex flex-wrap items-center gap-y-2 font-mono text-xs uppercase tracking-wider ${
                          isImageLeft ? "" : "justify-end"
                        }`}
                        style={{ color: "var(--ash)" }}
                      >
                        {cat.tags.map((tag, idx) => (
                          <li key={tag} className="flex items-center">
                            <span>{tag}</span>
                            {idx < cat.tags.length - 1 && (
                              <span aria-hidden="true" className="mx-3 opacity-50">
                                •
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}