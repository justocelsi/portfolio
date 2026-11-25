import type { Metadata } from "next";

import {
  experiencia,
  formacion,
  perfil,
  proyectos,
  skills,
} from "@/content/perfil";

import { Hoja } from "./hoja";

/**
 * El CV en castellano. Sale del mismo `perfil.ts` que la landing, así que no hay
 * dos versiones que se desincronicen: se edita ese archivo y se corre
 * `npm run cv`, que imprime esta página a `public/cv-justo-celsi.pdf`.
 */

export const metadata: Metadata = {
  title: `CV — ${perfil.nombre}`,
  description: perfil.bajada,
};

export default function CV() {
  return (
    <Hoja
      c={{
        nombre: perfil.nombre,
        rol: perfil.rol,
        ubicacion: perfil.ubicacion,
        links: perfil.links,
        rotulos: {
          experiencia: "Experiencia",
          proyectos: "Proyectos",
          formacion: "Formación",
          herramientas: "Herramientas",
        },
        experiencia,
        proyectos: proyectos.filter((p) => p.enCV !== false),
        formacion,
        skills,
      }}
    />
  );
}
