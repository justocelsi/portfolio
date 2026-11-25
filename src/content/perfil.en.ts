/**
 * The English CV (/cv/en). Only the text is translated here: stack, links and
 * dates come from `perfil.ts`, so there is a single source for everything that
 * is data. If a project changes there, its text has to change here too —
 * `traduccion()` fails the build if a CV project has no translation.
 *
 * Same rules as `perfil.ts`: role, dates and skills yes; the company name,
 * clients, data and architecture, no. Short, literal sentences.
 */

import {
  experiencia as experienciaEs,
  formacion as formacionEs,
  proyectos as proyectosEs,
  skills as skillsEs,
  type Experiencia,
  type Formacion,
  type Proyecto,
  type Skill,
} from "./perfil";

type Texto = { tagline: string; descripcion: string; destacado?: string };

const textos: Record<string, Texto> = {
  Taskmaster: {
    tagline: "Personal data platform",
    descripcion:
      "Ingests five sources —Jira, Google Calendar, phone notes, course schedules and personal lists— and decides what is worth doing now. It rotates by “last time surfaced”, so no task gets buried in the backlog.",
    destacado: "Over 1,100 tasks and 3,650 notes unified in a queryable warehouse",
  },
  Picnic: {
    tagline: "Editorial e-commerce",
    descripcion:
      "Store and content site for an art magazine. Mercado Pago checkout confirmed by a signed webhook, a per-user cart persisted in the database and a 3D shelf to pick the issue. Final project for Web Programming at ITBA.",
  },
  CISUR: {
    tagline: "Educational materials platform",
    descripcion:
      "Materials catalog, user accounts, PDF delivery and payments for a literacy center. Its owner runs it without touching code.",
  },
  RedBaires: {
    tagline: "Discrete-event simulator",
    descripcion:
      "Simulates how a rumor spreads on a social network and compares three policies to stop it: more moderators, a cap on reshares, or less reach for coordinated accounts. Group project for Operations Research II at ITBA.",
  },
  "py-data-pipeline-template": {
    tagline: "Data project scaffold",
    descripcion:
      "The template I start every pipeline with: uv, ruff, preconfigured logging, optional Postgres and tests from the first commit.",
  },
};

function traduccion(p: Proyecto): Proyecto {
  const t = textos[p.nombre];
  if (!t) throw new Error(`perfil.en.ts: falta traducir el proyecto «${p.nombre}»`);
  return { ...p, ...t };
}

export const perfilEn = {
  rol: "Data Engineer",
  ubicacion: "Buenos Aires, Argentina",
};

export const rotulosEn = {
  experiencia: "Experience",
  proyectos: "Projects",
  formacion: "Education",
  herramientas: "Skills",
};

export const experienciaEn: Experiencia[] = [
  {
    ...experienciaEs[0],
    rol: "Data Engineer",
    periodo: "May 2026 — present",
    resumen:
      "I work on the data layer. The company is in stealth, so I don't name it, and for confidentiality I don't detail sources, clients or architecture.",
    hitos: [
      "Data ingestion pipelines in Python.",
      "Data modeling and queries in PostgreSQL.",
      "Automation of recurring data processes.",
    ],
  },
];

export const proyectosEn: Proyecto[] = proyectosEs
  .filter((p) => p.enCV !== false)
  .map(traduccion);

export const formacionEn: Formacion = {
  ...formacionEs,
  // Traducción propia: el nombre oficial en inglés no está confirmado.
  titulo: "Bachelor's degree in Social and Business Analytics (Data Science)",
  detalle:
    "Two required courses left: Simulation and the Final Project. Expected graduation: late 2027.",
  cursando: undefined,
};

const grupos: Record<string, string> = {
  Datos: "Data",
  Código: "Code",
  Web: "Web",
  Herramientas: "Tools",
};
const items: Record<string, string> = { "Modelado dimensional": "Dimensional modeling" };

export const skillsEn: Skill[] = skillsEs.map((g) => ({
  ...g,
  grupo: grupos[g.grupo] ?? g.grupo,
  items: g.items.map((i) => items[i] ?? i),
}));
