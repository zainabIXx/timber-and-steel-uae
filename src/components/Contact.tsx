import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type FormEvent } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────────────────
// EMAILJS SETUP — paste your three values from the EmailJS dashboard here.
//   SERVICE_ID  → Email Services tab
//   TEMPLATE_ID → Email Templates tab
//   PUBLIC_KEY  → Account → General
// Install the SDK once: npm install @emailjs/browser
// ─────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_mpe0jz3";
const EMAILJS_TEMPLATE_ID = "template_b1u4ve7";
const EMAILJS_PUBLIC_KEY = "1S2k47T8LleQtvYhI";

// Scoped theme for this section — sourced from the global palette in styles.css
const contactThemeVars = {
  "--cnt-paper": "var(--bone)",
  "--cnt-timber": "var(--olive)",
  "--cnt-steel": "var(--steel)",
  "--cnt-ink": "var(--walnut)",
  "--cnt-rust": "var(--green)",
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

// Same delayMs pattern as About / Testimonials / Partners, so staggered
// reveals stay consistent across the whole site.
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

/** Underlined form field — same restrained language as the rest of the site: no boxes, just a hairline. */
function FormField({
  label,
  name,
  as = "input",
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  as?: "input" | "textarea";
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const sharedClasses =
    "w-full bg-transparent border-b border-[color:var(--cnt-steel)]/25 py-3 text-base text-[color:var(--cnt-ink)] placeholder:text-[color:var(--cnt-ink)]/40 placeholder:font-mono placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.3em] focus:outline-none focus:border-[color:var(--cnt-timber)] transition-colors duration-300";

  if (as === "textarea") {
    return (
      <textarea
        name={name}
        rows={4}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${sharedClasses} resize-none`}
      />
    );
  }

  return (
    <input
      name={name}
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={sharedClasses}
    />
  );
}

const contactRows = [
  {
    icon: Phone,
    label: "Call Us",
    href: "tel:0504284908",
    display: "0504284908",
  },
  {
    icon: Mail,
    label: "Email Us",
    href: "mailto:Sales@tscuae.com",
    display: "Sales@tscuae.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    href: null,
    display: null,
  },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      style={contactThemeVars}
      className="relative bg-[color:var(--bone)] text-[color:var(--cnt-ink)] px-8 py-20 md:px-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header — matches About / Testimonials / Partners treatment exactly; renumbered to 07 since 05 is now Testimonials */}
        <Reveal className="mb-20 md:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--cnt-steel)]">
            07 — Contact
          </span>
          <h2
            className="mt-3 text-2xl tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--cnt-timber)" }}
          >
            Get In Touch
          </h2>
          <div className="mt-4 h-px w-10 bg-[color:var(--cnt-steel)]/30" />
        </Reveal>

        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Column 1: Quote form */}
          <Reveal delayMs={0} className="relative group flex flex-col">
            <div className="relative pt-4">
              <div className="relative flex items-center gap-3 mb-8">
                <span className="h-1 w-3 bg-[color:var(--cnt-steel)]/40" />
                <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[color:var(--cnt-steel)]">
                  Request a Quote
                </span>
              </div>

              {status === "sent" ? (
                <p className="text-base leading-relaxed opacity-75">
                  Thank you — your message has been sent. We'll be in touch shortly.
                </p>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-md">
                  <FormField label="Name" name="name" value={name} onChange={setName} />
                  <FormField label="Email" name="email" type="email" value={email} onChange={setEmail} />
                  <FormField label="Message" name="message" as="textarea" value={message} onChange={setMessage} />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-4 flex items-center justify-center gap-2 bg-[color:var(--cnt-ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--cnt-paper)] transition-all duration-300 hover:bg-[color:var(--cnt-timber)] hover:shadow-lg active:scale-95 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send Message"}
                    <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>

                  {status === "error" && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--cnt-rust)]">
                      Something went wrong — please try again.
                    </span>
                  )}
                </form>
              )}
            </div>
          </Reveal>

          {/* Column 2: Direct contact */}
          <Reveal delayMs={150} className="flex flex-col">
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-10">
                <span className="h-1 w-3 bg-[color:var(--cnt-timber)]/40" />
                <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[color:var(--cnt-timber)]">
                  Contact Details
                </span>
              </div>

              <div className="space-y-8">
                {contactRows.map((row, i) => {
                  const Icon = row.icon;
                  const isLast = i === contactRows.length - 1;
                  return (
                    <Reveal key={row.label} delayMs={i * 150}>
                      <div
                        className={`group flex items-start gap-4 transition-all duration-300 ${
                          isLast ? "hover:pb-2" : "pb-6 border-b border-[color:var(--cnt-steel)]/12 hover:pb-8"
                        }`}
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--cnt-timber)]/8 transition-all duration-300 group-hover:bg-[color:var(--cnt-timber)]/15">
                          <Icon
                            className="h-5 w-5 text-[color:var(--cnt-timber)] transition-transform duration-300 group-hover:scale-110"
                            strokeWidth={1.5}
                          />
                        </span>
                        <div className="pt-0.5 flex-1">
                          <h3
                            className="text-sm tracking-tight md:text-base font-medium transition-colors duration-300 group-hover:text-[color:var(--cnt-timber)]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {row.label}
                          </h3>
                          {row.label === "Visit Us" ? (
                            <p className="mt-2 text-sm leading-relaxed opacity-75 md:text-base">
                              Al Sajaa, Emirates Industrial City, Sharjah
                              <br />
                              Office Hours: 8:00 AM to 5:00 PM, Monday to Saturday
                            </p>
                          ) : (
                            <a
                              href={row.href ?? undefined}
                              className="mt-2 block text-sm leading-relaxed opacity-75 transition-opacity duration-300 hover:opacity-100 md:text-base"
                            >
                              {row.display}
                            </a>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Map — full width, sits below both columns */}
        <Reveal delayMs={300} className="mt-16 md:mt-24">
          <div className="h-72 w-full overflow-hidden rounded-sm border border-[color:var(--cnt-steel)]/15 md:h-96 shadow-sm hover:shadow-md transition-shadow duration-300">
            <iframe
              title="Location map"
              src="https://www.google.com/maps?q=25.360844,55.646172&z=17&output=embed"
              className="h-full w-full grayscale-[15%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}