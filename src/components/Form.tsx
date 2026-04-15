import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, type ReactNode } from "react";

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

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium uppercase tracking-[0.06em] text-gray-500">
        {label}
      </label>

      {children}

      {error && (
        <span className="text-[12px] text-red-700">
          {error}
        </span>
      )}
    </div>
  );
}

function inputClasses(hasError: boolean) {
  return `
    w-full
    rounded-xl
    border
    ${hasError ? "border-red-500 ring-2 ring-red-500/10" : "border-black/10"}
    bg-white/65
    px-4
    py-3
    font-sans
    text-base
    text-gray-900
    outline-none
    transition
    focus:border-orange-500
    focus:bg-white/90
    focus:ring-2
    focus:ring-orange-500/10
  `;
}

interface ContactLink {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
}

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

    formData.append(
      "access_key",
      "a1d84ae9-2fbf-4521-bac0-1d48c2206293"
    );

    formData.append(
      "to",
      "leonardo.acosta@gnp.com.mx"
    );

    formData.append(
      "subject",
      "Nuevo contacto desde GNP Huehuetoca"
    );

    formData.append(
      "from_name",
      "Sitio Web GNP Huehuetoca"
    );

    formData.append("botcheck", "");

    (
      Object.entries(data) as [
        string,
        string | undefined
      ][]
    ).forEach(([k, v]) =>
      formData.append(k, v ?? "")
    );

    try {
      const res = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

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
          <rect
            width="20"
            height="16"
            x="2"
            y="4"
            rx="2"
          />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </>
      ),
    },
  ];

  return (
    <section className="
      relative
      min-h-svh
      w-full
      flex
      items-center
      justify-center
      overflow-hidden
      bg-gradient-to-br
      from-[#f5f7fa]
      via-[#edf1f7]
      to-[#e2eaf4]
      px-8
      py-12
      box-border
    ">

      {/* Orbes */}
      <div className="
        pointer-events-none
        absolute
        -top-[120px]
        -right-[100px]
        h-[420px]
        w-[420px]
        rounded-full
        bg-[radial-gradient(circle,rgba(249,115,22,0.09)_0%,transparent_70%)]
        blur-[48px]
      " />

      <div className="
        pointer-events-none
        absolute
        -bottom-[160px]
        -left-[140px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-[radial-gradient(circle,rgba(147,197,253,0.22)_0%,transparent_70%)]
        blur-[48px]
      " />

      <div className="
        pointer-events-none
        absolute
        top-[40%]
        left-[38%]
        h-[260px]
        w-[260px]
        rounded-full
        bg-[radial-gradient(circle,rgba(249,115,22,0.05)_0%,transparent_70%)]
        blur-[48px]
      " />

      <div className="
        relative
        z-10
        w-full
        grid
        gap-8
        md:grid-cols-[1fr_1.15fr]
        md:items-center
        md:gap-12
      ">

        {/* Columna izquierda */}
        <div className="flex flex-col gap-5">

          <span className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.08em]
            text-orange-500
          ">
            ● Contáctanos
          </span>

          <h2 className="
            m-0
            text-[clamp(2rem,5vw,2.75rem)]
            font-medium
            leading-tight
            text-gray-900
          ">
            Hablemos sobre
            <br />
            tu{" "}
            <em className="
              italic
              text-orange-500
            ">
              tranquilidad
            </em>
          </h2>

          <p className="
            m-0
            max-w-[36ch]
            text-[15px]
            leading-7
            text-gray-500
          ">
            En GNP Huehuetoca diseñamos estrategias
            a tu medida. Déjanos tus datos y un
            experto te contactará pronto.
          </p>

          <div className="
            mt-2
            flex
            flex-col
            gap-3
          ">
            {contactLinks.map(
              ({
                href,
                label,
                value,
                icon,
              }) => (
                <a
                  key={href}
                  href={href}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/80
                    bg-white/50
                    px-4
                    py-3
                    no-underline
                    backdrop-blur-xl
                    transition
                    hover:-translate-y-[1px]
                    hover:bg-white/75
                    active:scale-95
                  "
                >
                  <span className="
                    flex
                    items-center
                    justify-center
                    h-9
                    w-9
                    rounded-lg
                    bg-orange-500/10
                    text-orange-500
                    shrink-0
                  ">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon}
                    </svg>
                  </span>

                  <div className="
                    flex
                    flex-col
                    gap-[2px]
                    min-w-0
                  ">
                    <span className="
                      text-[11px]
                      font-medium
                      uppercase
                      tracking-[0.05em]
                      text-gray-400
                    ">
                      {label}
                    </span>

                    <span className="
                      text-sm
                      font-medium
                      text-gray-900
                      truncate
                    ">
                      {value}
                    </span>
                  </div>
                </a>
              )
            )}
          </div>
        </div>

        {/* Formulario */}
        <div className="
          rounded-3xl
          border
          border-white/80
          bg-white/50
          p-10
          shadow-[0_8px_40px_rgba(0,0,0,0.07)]
          backdrop-blur-3xl
        ">

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="
              flex
              flex-col
              gap-4
            ">

              <Field
                label="Nombre completo"
                error={errors.name?.message}
              >
                <input
                  {...register("name")}
                  type="text"
                  placeholder="¿Cómo te llamas?"
                  autoComplete="name"
                  className={inputClasses(
                    !!errors.name
                  )}
                />
              </Field>

              <div className="
                grid
                gap-4
                md:grid-cols-2
              ">

                <Field
                  label="Correo"
                  error={errors.email?.message}
                >
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className={inputClasses(
                      !!errors.email
                    )}
                  />
                </Field>

                <Field
                  label="Teléfono"
                  error={errors.phone?.message}
                >
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="55 1234 5678"
                    autoComplete="tel"
                    className={inputClasses(
                      !!errors.phone
                    )}
                  />
                </Field>

              </div>

              <Field
                label="Mensaje"
                error={errors.message?.message}
              >
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Cuéntanos en qué te podemos ayudar..."
                  className={inputClasses(
                    !!errors.message
                  )}
                  style={{ resize: "none" }}
                />
              </Field>

              <button
                type="submit"
                disabled={
                  status === "loading"
                }
                className="
                  mt-1
                  flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border-none
                  bg-orange-500
                  px-6
                  py-3.5
                  text-[15px]
                  font-medium
                  tracking-[0.02em]
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-[1px]
                  hover:bg-orange-600
                  hover:shadow-xl
                  active:scale-95
                  disabled:opacity-65
                  disabled:cursor-not-allowed
                "
              >
                <span>
                  {status === "loading"
                    ? "Enviando..."
                    : "Hablar con un Experto"}
                </span>

                <span className="text-[17px]">
                  →
                </span>
              </button>

            </div>
          </form>

        </div>

      </div>
    </section>
  );
}