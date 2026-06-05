"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Status = "idle" | "sending" | "success" | "error";

type Props = {
  open: boolean;
  onClose: () => void;
};

const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/semvdwebdesign@gmail.com";

export default function QuoteRequestModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      // Reset state when the modal is closed
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
      }, 300);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill this hidden field; humans don't
    if ((data.get("_honey") as string)?.length) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const payload: Record<string, string> = {
      _subject: "Nieuwe offerte aanvraag via website",
      _template: "table",
      _captcha: "false",
      Naam: (data.get("naam") as string) ?? "",
      Email: (data.get("email") as string) ?? "",
      Telefoon: (data.get("telefoon") as string) ?? "",
      Bedrijf: (data.get("bedrijf") as string) ?? "",
      "Type project": (data.get("type") as string) ?? "",
      Bericht: (data.get("bericht") as string) ?? "",
    };

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Er ging iets mis. Probeer het opnieuw of stuur een mail."
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            className="relative w-full max-w-xl rounded-2xl overflow-hidden"
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              background:
                "linear-gradient(160deg, #11152a 0%, #0a0d1e 60%, #07091a 100%)",
              border: "1px solid rgba(110,231,247,0.22)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(167,139,250,0.08)",
            }}
          >
            {/* Top gradient accent */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(110,231,247,0.6), rgba(167,139,250,0.6), transparent)",
              }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/55 hover:text-white hover:bg-white/8 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="px-7 lg:px-9 pt-9 pb-8">
              {status === "success" ? (
                <SuccessView onClose={onClose} />
              ) : (
                <>
                  <span className="block text-[11px] text-[#6ee7f7] uppercase tracking-[0.28em] font-medium mb-3">
                    Vrijblijvende offerte
                  </span>
                  <h2
                    id="quote-modal-title"
                    className="text-2xl lg:text-3xl font-bold tracking-tight mb-2"
                  >
                    Vertel kort wat je zoekt.
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-7">
                    Vul de velden in en ik kom snel bij je terug met een
                    eerlijk voorstel op maat.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {/* Honeypot — hidden from real users */}
                    <input
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden
                    />

                    <Field label="Naam" name="naam" required autoComplete="name" />
                    <Field
                      label="E-mailadres"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                    <Field
                      label="Telefoon (optioneel)"
                      name="telefoon"
                      type="tel"
                      autoComplete="tel"
                    />
                    <Field
                      label="Bedrijfsnaam (optioneel)"
                      name="bedrijf"
                      autoComplete="organization"
                    />

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="qm-type"
                        className="block text-xs text-white/55 mb-1.5 font-medium"
                      >
                        Type project
                      </label>
                      <select
                        id="qm-type"
                        name="type"
                        defaultValue="Website"
                        className="w-full rounded-lg px-3.5 py-2.5 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:ring-0"
                        style={{
                          background:
                            "rgba(255,255,255,0.04) url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff88' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\") no-repeat right 14px center",
                          border: "1px solid rgba(255,255,255,0.12)",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          WebkitTapHighlightColor: "transparent",
                          outline: "none",
                          boxShadow: "none",
                          colorScheme: "dark",
                        }}
                      >
                        <option value="Website" style={{ background: "#0a0d1e", color: "#fff" }}>
                          Website
                        </option>
                        <option value="Webshop" style={{ background: "#0a0d1e", color: "#fff" }}>
                          Webshop
                        </option>
                        <option
                          value="Anders / weet ik nog niet"
                          style={{ background: "#0a0d1e", color: "#fff" }}
                        >
                          Anders / weet ik nog niet
                        </option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="qm-bericht"
                        className="block text-xs text-white/55 mb-1.5 font-medium"
                      >
                        Vertel kort wat je zoekt <span className="text-[#6ee7f7]">*</span>
                      </label>
                      <textarea
                        id="qm-bericht"
                        name="bericht"
                        required
                        rows={4}
                        placeholder="Bijvoorbeeld: een nieuwe website voor mijn bedrijf, ongeveer 5 pagina's, met contactformulier..."
                        className="w-full rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none resize-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                    </div>

                    {status === "error" && (
                      <div className="sm:col-span-2 text-sm text-red-300 bg-red-500/10 border border-red-400/25 rounded-lg px-3.5 py-2.5">
                        Het versturen lukte niet ({errorMsg || "onbekende fout"}). Probeer
                        het opnieuw of mail direct naar{" "}
                        <a
                          href="mailto:semvdwebdesign@gmail.com"
                          className="underline text-red-200"
                        >
                          semvdwebdesign@gmail.com
                        </a>
                        .
                      </div>
                    )}

                    <div className="sm:col-span-2 flex items-center justify-between gap-3 pt-2">
                      <p className="text-[11px] text-white/35 leading-snug">
                        Door te versturen ga je akkoord met een eenmalige
                        reactie per mail. Geen nieuwsbrief, geen spam.
                      </p>

                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={{ scale: status === "sending" ? 1 : 1.03 }}
                        whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                        transition={{ type: "spring", stiffness: 320, damping: 18 }}
                        className="shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-[#0c0a1f] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background:
                            "linear-gradient(135deg, #6ee7f7 0%, #a78bfa 55%, #f0abfc 100%)",
                          boxShadow:
                            "0 8px 22px rgba(167,139,250,0.22), inset 0 1px 0 rgba(255,255,255,0.45)",
                        }}
                      >
                        {status === "sending" ? "Versturen..." : "Verstuur aanvraag"}
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `qm-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-white/55 mb-1.5 font-medium">
        {label}
        {required && <span className="text-[#6ee7f7]"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      />
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-4">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(110,231,247,0.18), rgba(167,139,250,0.18))",
          border: "1px solid rgba(110,231,247,0.4)",
          boxShadow: "0 0 32px rgba(110,231,247,0.25)",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold mb-2">Aanvraag verstuurd</h2>
      <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md mx-auto">
        Bedankt! Ik heb je aanvraag ontvangen en kom snel bij je terug met
        een voorstel op maat.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        Sluiten
      </button>
    </div>
  );
}
