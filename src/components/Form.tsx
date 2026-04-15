import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, type CSSProperties, type ReactNode } from "react";

// ── Schema de validación ──────────────────────────────────────
const schema = z.object({
  name: z.string().min(1, "Por favor ingresa tu nombre completo."),
  email: z
    .string()
    .min(1, "El correo es obligatorio.")
    .email("Ingresa un correo electrónico válido."),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.replace(/\D/g, "").length >= 8,
      "El teléfono debe tener al menos 8 dígitos."
    ),
  message: z.string().min(1, "Por favor escribe tu mensaje."),
});

type FormValues = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

// ── Tipos del componente Field ────────────────────────────────
interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

// ── Componente de campo ───────────────────────────────────────
function Field({ label, error, children }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "11px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#6b7280",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: "12px", color: "#b91c1c" }}>{error}</span>
      )}
    </div>
  );
}

// ── Estilos de input ──────────────────────────────────────────
function inputStyle(hasError: boolean): CSSProperties {
  return {
    width: "100%",
    borderRadius: "12px",
    border: hasError ? "1px solid #ef4444" : "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.65)",
    padding: "12px 16px",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "16px",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: hasError ? "0 0 0 3px rgba(239,68,68,0.10)" : "none",
    transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
  };
}

// ── Tipos para los links de contacto ─────────────────────────
interface ContactLink {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
}

// ── Componente principal ──────────────────────────────────────
export default function Form() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus("loading");

    const formData = new FormData();
    formData.append("access_key", "a1d84ae9-2fbf-4521-bac0-1d48c2206293");
    formData.append("to", "leonardo.acosta@gnp.com.mx");
    formData.append("subject", "Nuevo contacto desde GNP Huehuetoca");
    formData.append("from_name", "Sitio Web GNP Huehuetoca");
    formData.append("botcheck", "");
    (Object.entries(data) as [string, string | undefined][]).forEach(([k, v]) =>
      formData.append(k, v ?? "")
    );

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactLinks: ContactLink[] = [
    {
      href: "tel:+527205274302",
      label: "Teléfono directo",
      value: "+52 720 527 4302",
      icon: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.17-1.17a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      ),
    },
    {
      href: "mailto:leonardo.acosta@gnp.com.mx",
      label: "Correo",
      value: "leonardo.acosta@gnp.com.mx",
      icon: (
        <>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </>
      ),
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #f5f7fa, #edf1f7, #e2eaf4)",
        padding: "48px 36px",
        boxSizing: "border-box",
      }}
    >
      {/* Orbes de fondo */}
      <div style={{ pointerEvents: "none", position: "absolute", top: "-120px", right: "-100px", height: "420px", width: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 70%)", filter: "blur(48px)" }} />
      <div style={{ pointerEvents: "none", position: "absolute", bottom: "-160px", left: "-140px", height: "500px", width: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(147,197,253,0.22) 0%, transparent 70%)", filter: "blur(48px)" }} />
      <div style={{ pointerEvents: "none", position: "absolute", top: "40%", left: "38%", height: "260px", width: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)", filter: "blur(48px)" }} />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "900px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "32px",
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .gnp-grid { grid-template-columns: 1fr 1.15fr !important; align-items: center; gap: 48px !important; }
            .gnp-phones { grid-template-columns: 1fr 1fr !important; }
          }
          .gnp-contact-link:hover { transform: translateY(-1px); background: rgba(255,255,255,0.75) !important; }
          .gnp-contact-link:active { transform: scale(0.98); }
          .gnp-input:focus { border-color: #f97316 !important; background: rgba(255,255,255,0.92) !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.11) !important; }
          .gnp-btn:hover:not(:disabled) { transform: translateY(-1px); background: #ea6c0a !important; box-shadow: 0 6px 24px rgba(249,115,22,0.4) !important; }
          .gnp-btn:active:not(:disabled) { transform: scale(0.98); }
          .gnp-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        `}</style>

        <div className="gnp-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>

          {/* ── Columna izquierda ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f97316" }}>
              ● Contáctanos
            </span>

            <h2 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 500, lineHeight: 1.2, color: "#111827" }}>
              Hablemos sobre<br />
              tu <em style={{ fontStyle: "italic", color: "#f97316" }}>tranquilidad</em>
            </h2>

            <p style={{ margin: 0, maxWidth: "36ch", fontSize: "15px", lineHeight: 1.7, color: "#6b7280" }}>
              En GNP Huehuetoca diseñamos estrategias a tu medida.
              Déjanos tus datos y un experto te contactará pronto.
            </p>

            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {contactLinks.map(({ href, label, value, icon }) => (
                <a
                  key={href}
                  href={href}
                  className="gnp-contact-link"
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    borderRadius: "14px", border: "1px solid rgba(255,255,255,0.8)",
                    background: "rgba(255,255,255,0.5)", padding: "12px 16px",
                    textDecoration: "none", backdropFilter: "blur(12px)",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "36px", width: "36px", borderRadius: "10px", background: "rgba(249,115,22,0.10)", color: "#f97316", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {icon}
                    </svg>
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                    <span style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af" }}>{label}</span>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Columna derecha: formulario ── */}
          <div
            style={{
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.8)",
              background: "rgba(255,255,255,0.52)",
              padding: "40px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)",
              backdropFilter: "blur(32px)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Nombre */}
                <Field label="Nombre completo" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="¿Cómo te llamas?"
                    autoComplete="name"
                    className="gnp-input"
                    style={inputStyle(!!errors.name)}
                  />
                </Field>

                {/* Correo + Teléfono */}
                <div className="gnp-phones" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                  <Field label="Correo" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="tu@correo.com"
                      autoComplete="email"
                      className="gnp-input"
                      style={inputStyle(!!errors.email)}
                    />
                  </Field>
                  <Field label="Teléfono" error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="55 1234 5678"
                      autoComplete="tel"
                      className="gnp-input"
                      style={inputStyle(!!errors.phone)}
                    />
                  </Field>
                </div>

                {/* Mensaje */}
                <Field label="Mensaje" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    placeholder="Cuéntanos en qué te podemos ayudar..."
                    rows={4}
                    className="gnp-input"
                    style={{ ...inputStyle(!!errors.message), resize: "none" }}
                  />
                </Field>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="gnp-btn"
                  style={{
                    marginTop: "4px",
                    display: "flex",
                    minHeight: "52px",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    borderRadius: "14px",
                    border: "none",
                    background: "#f97316",
                    padding: "14px 24px",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                >
                  <span>{status === "loading" ? "Enviando..." : "Hablar con un Experto"}</span>
                  <span style={{ fontSize: "17px" }}>→</span>
                </button>

                {/* Mensajes de estado */}
                {status === "success" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRadius: "12px", border: "1px solid rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.10)", padding: "12px 16px", fontSize: "14px", fontWeight: 500, color: "#166534" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    ¡Mensaje enviado! Te contactaremos pronto.
                  </div>
                )}
                {status === "error" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRadius: "12px", border: "1px solid rgba(239,68,68,0.20)", background: "rgba(239,68,68,0.09)", padding: "12px 16px", fontSize: "14px", fontWeight: 500, color: "#b91c1c" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    Algo salió mal. Intenta de nuevo.
                  </div>
                )}

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}