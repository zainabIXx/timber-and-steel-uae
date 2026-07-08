import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, ArrowRight, ChevronDown, MapPin, Clock } from "lucide-react";
import Applications from "@/components/applications";
import { About } from "@/components/About";
import { ProductLine } from "@/components/ProductLine";
import { Services } from "@/components/Services";
import mainLogo from "@/assets/main_logo.png";
import bg2 from "@/assets/bg7.png";
import { Contact } from "@/components/Contact";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";

export const Route = createFileRoute("/")({
  component: Index,
});

// Nav labels + the section ids they scroll to. Labels intentionally differ
// from the underlying component/section names (e.g. "Portfolio" points at
// the #product-line section, "Markets" points at #applications) so the nav
// copy can read the way we want without renaming the sections themselves.
const navItems = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "product-line" },
  { label: "Markets", id: "applications" },
  { label: "Why Us", id: "why-us" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </span>
  );
}

// Manual smooth-scroll helper. We use this instead of relying on native
// href="#id" anchor jumps because TanStack Router's scroll restoration can
// intercept hash navigation and snap the page back to the top right after
// the browser jumps to the target — which looks like the link "does nothing".
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Keep the hash in the URL for deep-linking/back-button support without
    // triggering a router navigation.
    history.replaceState(null, "", `#${id}`);
  }
}

function Index() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main id="top" className="relative bg-background antialiased">
      {/* PERSISTENT TOP NAVBAR - Full width, glass effect */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-[2px] backdrop-saturate-150 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-4 sm:px-6 md:px-8">
          {/* Logo - pinned to the extreme left */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", "#top");
            }}
            className="flex shrink-0 items-center gap-3"
          >
            <img src={mainLogo} alt="TSC" className="h-9 -my-1 sm:h-12 sm:-my-2 md:h-24 md:-my-5 w-auto mix-blend-difference" />
          </a>

          {/* Horizontal Nav Links - always visible, scales down on mobile */}
          <nav>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-8 lg:gap-10">
              {navItems.map(({ label, id }) => {
                const isActive = activeSection === id;

                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className={`group relative flex items-center whitespace-nowrap text-[10px] uppercase tracking-[0.08em] transition-all mix-blend-difference sm:text-[9px] sm:tracking-[0.2em] md:text-[11px] md:tracking-[0.3em] ${
                      isActive
                        ? "text-[color:var(--olive)]"
                        : "text-[color:var(--beige)] hover:text-[color:var(--olive)]"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span className="group-hover:translate-y-[-2px] transition-transform duration-300">
                      {label}
                    </span>

                    {/* Hover-only underline — no persistent bar for the active/clicked section */}
                    <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-white/40 group-hover:w-full transition-all duration-300" />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        {/* Background with Subtle Zoom Animation */}
        <div
          className="absolute inset-0 transition-transform duration-[10s] ease-out hover:scale-105"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Bottom gradient overlay so footer-of-hero controls stay legible over any part of the image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-10" />

        {/* STATS ROW - centered along the bottom of the hero, sits between the quote link and scroll indicator */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 hidden justify-center px-8 md:flex md:bottom-12 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:900ms] [animation-fill-mode:backwards]">
          <div className="grid w-full max-w-2xl grid-cols-3 divide-x divide-white/15 text-center">
            {[
              { value: "500+", label: "Clients Served" },
              { value: "15+", label: "Countries" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="px-4">
                <div
                  className="text-2xl text-white md:text-3xl font-light"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REQUEST A QUOTE - Bottom Left of hero only, scrolls away with hero */}
        <div className="absolute left-8 bottom-8 z-20 md:left-12 md:bottom-12 animate-in fade-in slide-in-from-bottom-2 duration-700 [animation-delay:1100ms] [animation-fill-mode:backwards]">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-[color:var(--beige)] hover:opacity-80 transition-all"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Request a Quote</span>
            <div className="h-[1px] w-4 bg-white/40 group-hover:w-8 transition-all duration-300" />
          </a>
        </div>

        {/* SCROLL INDICATOR - Bottom Right of hero only, minimal */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
          aria-label="Scroll down"
          className="group absolute right-8 bottom-8 z-20 flex flex-col items-center gap-2 text-[color:var(--beige)] hover:opacity-80 transition-colors md:right-12 md:bottom-12 animate-in fade-in duration-700 [animation-delay:1100ms] [animation-fill-mode:backwards]"
        >
          <span
            className="text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-rl]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>

        {/* Main Content - Centered & Refined, nudged up for a less crowded bottom edge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20 pointer-events-none">
          <div className="max-w-4xl space-y-5 -translate-y-6 md:-translate-y-8 pointer-events-auto">
            <div className="h-[1px] w-12 bg-white/40 mx-auto mb-6 animate-in fade-in zoom-in-50 duration-500 [animation-delay:100ms] [animation-fill-mode:backwards]" />

            <h1
              className="text-4xl md:text-6xl lg:text-6xl xl:text-7xl text-white font-light leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 [animation-delay:250ms] [animation-fill-mode:backwards]"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Timber <span style={{ color: "var(--beige)" }}>&</span> Steel Corner <br />
              Industries LLC
            </h1>

            <p className="text-sm md:text-base text-[color:var(--beige)] tracking-[0.15em] uppercase font-light max-w-lg mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:600ms] [animation-fill-mode:backwards]">
              Your trusted partner in Global Commodities Trading and Logistics Solutions
            </p>

            <div className="flex items-center justify-center gap-6 pt-5 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:800ms] [animation-fill-mode:backwards]">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="group flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80 hover:opacity-80 transition-colors"
              >
                Get Started <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="h-8 w-[1px] bg-white/20" />
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="text-xs uppercase tracking-[0.3em] text-white/80 hover:opacity-80 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <About />

      <Services />

      <ProductLine />

      <Applications />

      <WhyUs />
      
      <Testimonials />

      <Partners />

      <Contact />

      {/* FOOTER */}
      <footer className="bg-[#5C4033] px-6 py-14 text-[#cebe9c] md:px-16 lg:px-24 border-t border-[#cebe9c]/10">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-10 md:grid-cols-3">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={mainLogo} alt="Timber & Steel Corner Industries LLC" className="h-10 w-auto object-contain" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.25em] text-[#cebe9c]">
                Timber & Steel Corner Industries LLC
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed text-[#cebe9c]/60 max-w-sm">
              Premium craftsmanship combined with reliable structural integration. Redefining commercial commodities and engineering trading across global horizons.
            </p>
          </div>

          {/* Column 2: Structural Navigation */}
          <div className="space-y-5">
            <span className="block text-[10px] font-medium uppercase tracking-[0.4em] text-[#cebe9c]/40">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs font-light uppercase tracking-widest">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">About</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">Services</a>
              <a href="#product-line" onClick={(e) => { e.preventDefault(); scrollToSection("product-line"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">Portfolio</a>
              <a href="#applications" onClick={(e) => { e.preventDefault(); scrollToSection("applications"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">Markets</a>
              <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollToSection("why-us"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">Why Us</a>
              <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">Testimonials</a>
              <a href="#partners" onClick={(e) => { e.preventDefault(); scrollToSection("partners"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">Partners</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="text-[#cebe9c]/70 hover:text-[#cebe9c] transition-colors duration-200">Contact</a>
            </div>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-5">
            <span className="block text-[10px] font-medium uppercase tracking-[0.4em] text-[#cebe9c]/40">
              Contact Details
            </span>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-4 group">
                <div className="mt-0.5 h-8 w-8 rounded-full border border-[#cebe9c]/15 flex items-center justify-center group-hover:border-[#cebe9c]/40 transition-colors duration-300 shrink-0">
                  <Phone className="h-3 w-3 text-[#cebe9c]" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#cebe9c]/40 font-medium">Phone Support</span>
                  <a href="tel:0504284908" className="text-[#cebe9c]/80 hover:text-[#cebe9c] transition-colors font-mono">0504284908</a>
                </div>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="mt-0.5 h-8 w-8 rounded-full border border-[#cebe9c]/15 flex items-center justify-center group-hover:border-[#cebe9c]/40 transition-colors duration-300 shrink-0">
                  <Mail className="h-3 w-3 text-[#cebe9c]" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#cebe9c]/40 font-medium">Email Inquiry</span>
                  <a href="mailto:Sales@tscuae.com" className="text-[#cebe9c]/80 hover:text-[#cebe9c] transition-colors font-mono">Sales@tscuae.com</a>
                </div>
              </li>

              <li className="flex items-start gap-4 pt-0.5">
                <div className="mt-0.5 h-8 w-8 rounded-full border border-[#cebe9c]/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-3 w-3 text-[#cebe9c]/60" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#cebe9c]/40 font-medium">Headquarters</span>
                  <span className="text-xs text-[#cebe9c]/80 leading-relaxed">
                    Al Sajaa, Emirates Industrial City, Sharjah
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="mt-0.5 h-8 w-8 rounded-full border border-[#cebe9c]/15 flex items-center justify-center shrink-0">
                  <Clock className="h-3 w-3 text-[#cebe9c]/60" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#cebe9c]/40 font-medium">Availability</span>
                  <span className="text-xs text-[#cebe9c]/70 italic leading-relaxed">
                    8:00 AM to 5:00 PM, Monday to Saturday
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Footer Subline */}
        <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 border-t border-[#cebe9c]/10 pt-6 text-[9px] uppercase tracking-[0.35em] text-[#cebe9c]/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Timber & Steel Corner Industries LLC. All rights reserved.</span>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-[#cebe9c] transition-colors duration-200">Privacy Policy</span>
            <span className="cursor-pointer hover:text-[#cebe9c] transition-colors duration-200">Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
