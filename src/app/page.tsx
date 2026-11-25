import Image from "next/image";
import {
  experiencia,
  formacion,
  perfil,
  proyectos,
  skills,
  tonoDe,
  type Proyecto,
  type Tono,
} from "@/content/perfil";

/* -------------------------------------------------------------------------
   Primitivas. Toda la página se arma con estas cinco: si algo necesita una
   sexta, probablemente esté rompiendo una regla del sistema.
   ------------------------------------------------------------------------- */

/** Regla 3: el tamaño más chico. Mono, para rótulos y metadatos. */
function Micro({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.16em] text-muted ${className}`}
    >
      {children}
    </p>
  );
}

/** Regla 1: la sección ES la grilla de dos ejes. Nadie más define columnas. */
function Seccion({
  rotulo,
  children,
}: {
  rotulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-14 sm:py-20">
      <div className="grid gap-6 sm:grid-cols-[7rem_1fr] sm:gap-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {rotulo}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** Regla 3: el título de cualquier ítem. Un solo tamaño en toda la página. */
function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold tracking-tight">{children}</h3>
  );
}

/**
 * Regla 4: el color va en el fondo y el borde; el texto queda en tinta.
 * El trío está validado para daltonismo, no para contraste de lectura.
 */
const TONO: Record<Tono, string> = {
  datos: "border-cat-datos/40 bg-cat-datos-soft",
  codigo: "border-cat-codigo/40 bg-cat-codigo-soft",
  web: "border-cat-web/40 bg-cat-web-soft",
  neutro: "border-cat-neutro/40 bg-cat-neutro-soft",
};

const SWATCH: Record<Tono, string> = {
  datos: "bg-cat-datos",
  codigo: "bg-cat-codigo",
  web: "bg-cat-web",
  neutro: "bg-cat-neutro",
};

function Chip({
  children,
  tono = "neutro",
}: {
  children: React.ReactNode;
  tono?: Tono;
}) {
  return (
    <li
      className={`rounded-[6px] border px-3 py-1.5 font-mono text-sm text-foreground ${TONO[tono]}`}
    >
      {children}
    </li>
  );
}

/** Regla 2: un link es mono y lleva el cursor afuera. */
function Externo({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      className="font-mono text-sm text-accent underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
      href={href}
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

/* ------------------------------------------------------------------------- */

/** "2026-03-16" → "03/2026". Sin `new Date()`: parsear ISO corre la fecha un
 *  día para atrás en UTC-3 y el mes queda mal en los días 1. */
function mesAno(iso: string) {
  const [ano, mes] = iso.split("-");
  return `${mes}/${ano}`;
}

function Hero() {
  return (
    <header className="py-16 sm:py-24">
      <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
        {perfil.nombre}
      </h1>
      <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-muted">
        {perfil.bajada}
      </p>

      <nav className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Externo href={perfil.links.github}>GitHub</Externo>
        <Externo href={perfil.links.linkedin}>LinkedIn</Externo>
        <Externo href={perfil.links.cv}>CV (PDF)</Externo>
        <Externo href={`mailto:${perfil.links.email}`}>
          {perfil.links.email}
        </Externo>
        <span className="font-mono text-sm text-muted">{perfil.ubicacion}</span>
      </nav>
    </header>
  );
}

function Experiencia() {
  if (experiencia.length === 0) return null;

  return (
    <Seccion rotulo="Experiencia">
      <ol className="grid gap-12">
        {experiencia.map((e) => (
          <li key={`${e.empresa}-${e.rol}`}>
            <Micro>{e.periodo}</Micro>
            <div className="mt-2">
              <Titulo>
                {e.rol}
                <span className="text-muted"> · </span>
                {e.empresa}
              </Titulo>
            </div>

            <p className="mt-3 max-w-[68ch] leading-relaxed text-muted">
              {e.resumen}
            </p>

            <ul className="mt-4 grid max-w-[68ch] gap-1.5">
              {e.hitos.map((h) => (
                <li
                  key={h}
                  className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                >
                  {h}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {e.stack.map((t) => (
                <Chip key={t} tono={tonoDe(t)}>
                  {t}
                </Chip>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}

/**
 * La ventana. Existe para que un proyecto web se vea, no se lea: chrome de
 * navegador arriba, la captura del deploy en el medio, y abajo los tres datos
 * que prueban que está vivo.
 */
function Ventana({ p }: { p: Proyecto }) {
  if (!p.demo || !p.captura) return null;
  const host = p.demo.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <figure className="mt-5 overflow-hidden rounded-[10px] border border-border bg-surface lg:mt-0">
      <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="truncate font-mono text-xs text-muted">{host}</span>
      </div>

      <a href={p.demo} className="block">
        <Image
          src={p.captura}
          alt={`Captura del deploy de ${p.nombre}`}
          width={1440}
          height={900}
          sizes="(max-width: 640px) 100vw, 1100px"
          className="h-auto w-full border-b border-border"
        />
      </a>

      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-1.5 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {/* Regla 4: el estado nunca viaja solo en el color. Punto + palabra. */}
        <span className="flex items-center gap-1.5 text-foreground">
          <span aria-hidden="true" className="size-2 rounded-full bg-ok" />
          Live
        </span>
        {p.creado && (
          <span>
            Creado <span className="tabular">{mesAno(p.creado)}</span>
          </span>
        )}
        {p.actualizado && (
          <span>
            Actualizado <span className="tabular">{mesAno(p.actualizado)}</span>
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function Proyectos() {
  return (
    <Seccion rotulo="Proyectos">
      <ol className="grid gap-16">
        {proyectos.map((p) => {
          // Con captura, en pantallas anchas la ventana va a la izquierda y el
          // texto al lado: apiladas, cada captura ocupaba el ancho entero y la
          // página medía cinco pantallas de puro screenshot. En el celu queda
          // como antes: título, ventana, texto.
          const conVentana = Boolean(p.demo && p.captura);
          return (
            <li
              key={p.nombre}
              className={
                conVentana
                  ? "grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10"
                  : undefined
              }
            >
              <div className={conVentana ? "lg:col-start-2 lg:row-start-1" : undefined}>
                <Titulo>{p.nombre}</Titulo>
                <Micro className="mt-1.5">{p.tagline}</Micro>
              </div>

              {conVentana && (
                <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
                  <Ventana p={p} />
                </div>
              )}

              <div className={conVentana ? "lg:col-start-2" : undefined}>
                <p className="mt-5 max-w-[68ch] leading-relaxed text-muted">
                  {p.descripcion}
                </p>

                {p.destacado && (
                  <p className="mt-4 max-w-[68ch] border-l-2 border-accent bg-accent-soft py-2 pl-4">
                    {p.destacado}
                  </p>
                )}

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <Chip key={t} tono={tonoDe(t)}>
                      {t}
                    </Chip>
                  ))}
                </ul>

                {(p.demo || p.repo) && (
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {p.demo && <Externo href={p.demo}>Ver en vivo</Externo>}
                    {p.repo && <Externo href={p.repo}>Código</Externo>}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Seccion>
  );
}

function Stack() {
  return (
    <Seccion rotulo="Stack">
      <div className="grid gap-8">
        {skills.map((g) => (
          <div key={g.grupo}>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-[2px] ${SWATCH[g.tono]}`}
              />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {g.grupo}
              </h3>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Chip key={item} tono={g.tono}>
                  {item}
                </Chip>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Seccion>
  );
}

function Formacion() {
  return (
    <Seccion rotulo="Formación">
      <Titulo>{formacion.titulo}</Titulo>
      <p className="mt-1.5 text-muted">{formacion.institucion}</p>
      <p className="mt-3 max-w-[68ch] leading-relaxed text-muted">
        {formacion.detalle}
      </p>

      {formacion.cursando && (
        <>
          <Micro className="mt-6">Cursando</Micro>
          <ul className="mt-3 flex flex-wrap gap-2">
            {/* Códigos de materia, no tecnologías: neutro a propósito. */}
            {formacion.cursando.map((m) => (
              <Chip key={m}>{m}</Chip>
            ))}
          </ul>
        </>
      )}
    </Seccion>
  );
}

function Contacto() {
  return (
    <Seccion rotulo="Contacto">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <Externo href={`mailto:${perfil.links.email}`}>
          {perfil.links.email}
        </Externo>
        <Externo href={perfil.links.linkedin}>LinkedIn</Externo>
        <Externo href={perfil.links.github}>GitHub</Externo>
      </div>
    </Seccion>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[80rem] flex-1 px-6 sm:px-10">
      <Hero />
      <Experiencia />
      <Proyectos />
      <Stack />
      <Formacion />
      <Contacto />
      <footer className="border-t border-border py-8">
        <Micro>
          Next.js · el código de esta página está en GitHub
        </Micro>
      </footer>
    </main>
  );
}
