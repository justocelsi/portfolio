import type { Metadata } from "next";

import {
  experiencia,
  formacion,
  perfil,
  proyectos,
  skills,
} from "@/content/perfil";

/**
 * El CV. Sale del mismo `perfil.ts` que la landing, así que no hay dos versiones
 * que se desincronicen: se edita ese archivo y se corre `npm run cv`, que
 * imprime esta página a `public/cv-justo-celsi.pdf`.
 *
 * Está pensada para papel A4 y una sola carilla. En pantalla se ve como la hoja.
 * Las mismas reglas que la landing: mono para lo que es dato (fechas,
 * tecnologías, URLs), sans para la prosa, y el nombre de la empresa no aparece.
 */

export const metadata: Metadata = {
  title: `CV — ${perfil.nombre}`,
  description: perfil.bajada,
};

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-border pb-1 font-mono text-[8.5pt] uppercase tracking-[0.18em] text-muted">
      {children}
    </h2>
  );
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <p className="mt-1 font-mono text-[8.5pt] text-muted">{items.join(" · ")}</p>
  );
}

function sinEsquema(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function CV() {
  return (
    <main className="mx-auto w-full max-w-[210mm] bg-surface px-[16mm] py-[14mm] text-[9.5pt] leading-snug text-foreground print:max-w-none print:bg-white print:p-0">
      <style>{`@page { size: A4; margin: 12mm 15mm; } @media print { body { background: #fff; } }`}</style>

      <header>
        <h1 className="text-[22pt] font-semibold tracking-tight">{perfil.nombre}</h1>
        <p className="mt-0.5 text-[12pt]">{perfil.rol}</p>
        <p className="mt-2 font-mono text-[8.5pt] text-muted">
          {perfil.ubicacion} · {perfil.links.email} · {sinEsquema(perfil.links.github)} ·{" "}
          {sinEsquema(perfil.links.linkedin)}
        </p>
      </header>

      <section className="mt-4">
        <Rotulo>Experiencia</Rotulo>
        {experiencia.map((e) => (
          <div key={e.rol + e.periodo}>
            <p className="font-semibold">
              {e.rol} · {e.empresa}{" "}
              <span className="font-mono text-[8.5pt] font-normal text-muted">{e.periodo}</span>
            </p>
            <p className="mt-1">{e.resumen}</p>
            <ul className="mt-1 list-disc pl-4">
              {e.hitos.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <Stack items={e.stack} />
          </div>
        ))}
      </section>

      <section className="mt-4">
        <Rotulo>Proyectos</Rotulo>
        <div className="grid gap-2">
          {proyectos.filter((p) => p.enCV !== false).map((p) => (
            <div key={p.nombre} className="break-inside-avoid">
              <p>
                <span className="font-semibold">{p.nombre}</span>
                <span className="text-muted"> — {p.tagline}</span>
                {(p.demo ?? p.repo) && (
                  <span className="font-mono text-[8.5pt] text-muted">
                    {" "}
                    · {sinEsquema((p.demo ?? p.repo) as string)}
                  </span>
                )}
              </p>
              <p className="mt-0.5">{p.descripcion}</p>
              {p.destacado && <p className="mt-0.5 font-medium">{p.destacado}</p>}
              <Stack items={p.stack} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 break-inside-avoid">
        <Rotulo>Formación</Rotulo>
        <p className="font-semibold">{formacion.titulo}</p>
        <p>{formacion.institucion}</p>
        <p className="mt-0.5">{formacion.detalle}</p>
      </section>

      <section className="mt-4 break-inside-avoid">
        <Rotulo>Herramientas</Rotulo>
        <div className="grid gap-0.5">
          {skills.map((g) => (
            <p key={g.grupo}>
              <span className="font-semibold">{g.grupo}:</span>{" "}
              <span className="font-mono text-[8.5pt]">{g.items.join(" · ")}</span>
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
