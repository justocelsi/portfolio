import type { Metadata } from "next";

import { perfil } from "@/content/perfil";
import {
  experienciaEn,
  formacionEn,
  perfilEn,
  proyectosEn,
  rotulosEn,
  skillsEn,
} from "@/content/perfil.en";

import { Hoja } from "../hoja";

/**
 * The CV in English, for applications abroad (Riot, KAN-1060). `npm run cv`
 * prints it to `public/cv-justo-celsi-en.pdf`.
 */

export const metadata: Metadata = {
  title: `CV — ${perfil.nombre}`,
  description: `${perfilEn.rol} at a stealth AI startup.`,
};

export default function CVEn() {
  return (
    <div lang="en">
      <Hoja
        c={{
          nombre: perfil.nombre,
          rol: perfilEn.rol,
          ubicacion: perfilEn.ubicacion,
          links: perfil.links,
          rotulos: rotulosEn,
          experiencia: experienciaEn,
          proyectos: proyectosEn,
          formacion: formacionEn,
          skills: skillsEn,
        }}
      />
    </div>
  );
}
