import { useEffect, useState } from "react";
import logo from "@/assets/main_logo.png";

const links = [
  { hash: "about", label: "About" },
  { hash: "product-line", label: "Product Line" },
  { hash: "applications", label: "Applications" },
  { hash: "contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed left-6 top-6 z-40 flex items-center gap-3 md:left-10 md:top-8">
      <a href="#top" className="flex items-center gap-3">
        <img src={logo} alt="TSC" className="h-10 w-auto md:h-12" />
        <span
          className="hidden text-sm uppercase tracking-[0.25em] text-foreground/80 sm:inline"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Timber &amp; Steel Company
        </span>
      </a>
    </header>
  );
}

export function SiteNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [active, setActive] = useState<string>("");
  const rule = tone === "light" ? "bg-foreground/20" : "bg-white/25";
  const idle = tone === "light" ? "text-foreground/70" : "text-white/70";
  const hover = tone === "light" ? "hover:text-foreground" : "hover:text-white";

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.hash))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3 md:bottom-12 md:right-12">
      <span className={`h-8 w-px ${rule}`} />
      <ul
        className="flex flex-col items-end gap-2 text-sm uppercase tracking-[0.2em] md:text-base"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {links.map((l) => {
          const isActive = active === l.hash;
          return (
            <li key={l.hash}>
              <a
                href={`#${l.hash}`}
                className={`transition-colors ${hover} ${
                  isActive ? "text-[var(--olive)] font-medium" : idle
                }`}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
