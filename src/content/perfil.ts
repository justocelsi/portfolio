/**
 * Todo el contenido de la landing vive acá.
 *
 * La idea es que para editar la página no haya que tocar JSX: se cambia este
 * archivo y listo.
 *
 * ⚠️ REGLA DEL TRABAJO: rol, fechas y skills sí. El nombre de la empresa,
 * clientes, datos, arquitectura y código, no — está en stealth y eso se respeta
 * acá igual que en LinkedIn. Este repo es público.
 *
 * ⚠️ REGLA DE REDACCIÓN: frases cortas y literales. Nada de metáforas, nada de
 * "lo interesante no fue X sino Y", nada de cerrar párrafos con una sentencia
 * ingeniosa. Si una frase suena a manifiesto, sobra.
 */

export const perfil = {
  nombre: "Justo Celsi",
  rol: "Jr. Data Scientist",
  empresa: "Stealth AI startup",
  ubicacion: "Buenos Aires, Argentina",

  // Una línea. Es lo único que lee alguien que abre la página 8 segundos.
  bajada:
    "Jr. Data Scientist en una startup de IA en stealth y estudiante de la Licenciatura en Analítica Social y Empresarial en el ITBA.",

  links: {
    github: "https://github.com/justocelsi",
    linkedin: "https://www.linkedin.com/in/justocelsi/",
    email: "justocelsi@gmail.com",
  },
} as const;

/**
 * `tono` mapea a un color categórico. Son tres hues + neutro y no se pueden
 * agregar más: cuatro hues simultáneos no pasan la validación de daltonismo en
 * modo oscuro (verificado con el validador, todos los candidatos fallan).
 * El neutro es la vía de escape para el grupo que no compite por atención.
 */
export type Tono = "datos" | "codigo" | "web" | "neutro";

export type Skill = { grupo: string; tono: Tono; items: string[] };

export const skills: Skill[] = [
  {
    grupo: "Datos",
    tono: "datos",
    items: ["PostgreSQL", "SQL", "Modelado dimensional", "ETL", "SQLite", "Neon"],
  },
  {
    grupo: "Código",
    tono: "codigo",
    items: ["Python", "TypeScript", "Bash", "pytest", "uv"],
  },
  {
    grupo: "Web",
    tono: "web",
    items: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"],
  },
  {
    grupo: "Herramientas",
    tono: "neutro",
    items: ["Git", "Docker", "WSL", "MCP", "OAuth 2.0"],
  },
];

/**
 * El color sigue a la tecnología, no al lugar donde aparece: PostgreSQL es del
 * mismo color en Stack, en Experiencia y en cualquier proyecto. `skills` es la
 * única fuente de verdad; lo que no está ahí cae en neutro, y eso también
 * comunica algo — no es una skill que reclame.
 */
export function tonoDe(item: string): Tono {
  return skills.find((g) => g.items.includes(item))?.tono ?? "neutro";
}

export type Experiencia = {
  rol: string;
  empresa: string;
  periodo: string;
  resumen: string;
  hitos: string[];
  stack: string[];
};

/**
 * Los hitos son deliberadamente genéricos: el trabajo es confidencial y la
 * empresa está en stealth. Describen el tipo de tarea, no el sistema, ni el
 * cliente, ni quién es la empresa.
 */
export const experiencia: Experiencia[] = [
  {
    rol: "Jr. Data Scientist",
    empresa: "Stealth AI startup",
    periodo: "Mayo 2026 — presente",
    resumen:
      "Trabajo sobre la capa de datos. La empresa está en stealth, así que no la nombro, y por confidencialidad no detallo fuentes, clientes ni arquitectura.",
    hitos: [
      "Pipelines de ingesta de datos en Python.",
      "Modelado y consultas en PostgreSQL.",
      "Automatización de procesos de datos recurrentes.",
    ],
    stack: ["Python", "PostgreSQL", "SQL", "ETL"],
  },
];

export type Proyecto = {
  nombre: string;
  tagline: string;
  descripcion: string;
  stack: string[];
  /** Deploy público. Si existe, la tarjeta muestra la ventana con la captura. */
  demo?: string;
  repo?: string;
  /** Archivo en /public. Se captura con `npm run capturas`. */
  captura?: string;
  /** ISO. Alimentan la barra de estado. Vienen de la API de GitHub. */
  creado?: string;
  actualizado?: string;
  /** Un solo dato duro, si lo hay. */
  destacado?: string;
};

export const proyectos: Proyecto[] = [
  {
    nombre: "Taskmaster",
    tagline: "Plataforma de datos personal",
    descripcion:
      "Ingiere de cinco fuentes —Jira, Google Calendar, notas del teléfono, cronogramas de cátedra y listas propias— y decide qué conviene hacer ahora. Rota por «última vez consultada», así ninguna tarea queda enterrada en el backlog.",
    stack: ["Python", "SQLite", "PostgreSQL", "Neon", "YAML"],
    destacado: "Más de 1.100 tareas y 3.650 notas unificadas en un warehouse consultable",
  },
  {
    nombre: "Picnic",
    tagline: "E-commerce editorial",
    descripcion:
      "Tienda y sitio de contenidos para una revista de arte. Checkout con Mercado Pago confirmado por webhook firmado, carrito persistido en base por usuario y una estantería 3D para elegir la edición. Trabajo final de Programación Web en el ITBA.",
    stack: ["JavaScript", "Supabase", "PostgreSQL", "Mercado Pago", "Vercel"],
    demo: "https://picniczine.vercel.app",
    repo: "https://github.com/justocelsi/picnic",
    captura: "/shot-picnic.png",
    creado: "2026-03-16",
    actualizado: "2026-07-08",
  },
  {
    nombre: "CISUR",
    tagline: "Plataforma de materiales educativos",
    descripcion:
      "Catálogo de materiales, cuentas de usuario, entrega de PDFs y cobros para un centro de alfabetización. La administra su dueña sin tocar código.",
    stack: ["Next.js", "Supabase", "Mercado Pago", "Vercel"],
    demo: "https://cisur.vercel.app",
    repo: "https://github.com/justocelsi/cisur",
    captura: "/shot-cisur.png",
    creado: "2026-07-29",
    actualizado: "2026-08-06",
  },
  {
    nombre: "Vigilia",
    tagline: "Roguelike por turnos",
    descripcion:
      "Roguelike de combate por turnos donde el resultado de cada decisión es incierto. Jugable en el navegador, con pixel art propio.",
    stack: ["TypeScript", "Next.js", "Vercel"],
    demo: "https://roguelike-opal.vercel.app",
    repo: "https://github.com/justocelsi/roguelike",
    captura: "/shot-roguelike.png",
    creado: "2026-07-27",
    actualizado: "2026-08-13",
  },
  {
    nombre: "RedBaires",
    tagline: "Simulador de eventos discretos",
    descripcion:
      "Simula cómo se difunde un rumor en una red social y compara tres políticas para frenarlo: más moderadores, un límite a los reenvíos o menos alcance para las cuentas coordinadas. Trabajo práctico grupal de Investigación de Operaciones II en el ITBA.",
    stack: ["Python", "SimPy", "Jupyter"],
    repo: "https://github.com/justocelsi/io2-tp3-redbaires",
    creado: "2026-09-25",
    actualizado: "2026-11-12",
  },
  {
    nombre: "py-data-pipeline-template",
    tagline: "Scaffold de proyectos de datos",
    descripcion:
      "El template con el que arranco cualquier pipeline: uv, ruff, logging configurado, Postgres opcional y tests desde el primer commit.",
    stack: ["Python", "uv", "pytest", "PostgreSQL"],
    repo: "https://github.com/justocelsi/py-data-pipeline-template",
    creado: "2026-05-29",
    actualizado: "2026-05-29",
  },
  {
    nombre: "El Poseído",
    tagline: "Juego de cartas",
    descripcion:
      "Juego de cartas de empatía e intuición. La app es el paso intermedio hacia la versión física de mesa.",
    stack: ["Diseño de juego", "HTML"],
    // GitHub Pages, no Vercel. El repo se mudó a `justocelsi` el 4/9/2026 y la
    // URL cambió de dueño: la vieja (justocel.github.io) quedó muerta.
    demo: "https://justocelsi.github.io/elposeido",
    repo: "https://github.com/justocelsi/elposeido",
    captura: "/shot-elposeido.png",
    creado: "2026-05-26",
    actualizado: "2026-06-12",
  },
];

export type Formacion = {
  titulo: string;
  institucion: string;
  detalle: string;
  cursando?: string[];
};

export const formacion: Formacion = {
  titulo: "Licenciatura en Analítica Social y Empresarial (Data Science)",
  institucion: "ITBA — Instituto Tecnológico de Buenos Aires",
  detalle: "Me quedan dos materias obligatorias, Simulación y el Proyecto Final. Me recibo a fines de 2027.",
  cursando: [
    "82.05 Análisis Predictivo",
    "11.86 Investigación de Operaciones I",
    "11.87 Investigación de Operaciones II",
  ],
};
