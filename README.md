# Portfolio — Justo Celsi

Landing personal. Next.js 16, Tailwind 4, deploy en Vercel.

Publicada en **https://justocelsi.vercel.app**. Vercel está conectado al repo desde el 25/11/2026:
cada push a `main` publica solo, y un push a otra rama arma una versión de prueba con su propia URL.

**Los PDF del CV no se regeneran en Vercel.** Si cambia algo del CV, correr `npm run cv` antes del
push (imprime `/cv` y `/cv/en` a `public/`).

## Editar el contenido

Todo el texto vive en [`src/content/perfil.ts`](src/content/perfil.ts). Para
cambiar la página no hace falta tocar JSX: se edita ese archivo y listo.

Dos reglas que están escritas ahí arriba y conviene respetar:

- **Confidencialidad.** Del trabajo se publican rol, fechas y skills. El nombre
  de la empresa no: está en stealth. Clientes, datos, arquitectura y código,
  tampoco. Este repo es público.
- **Redacción.** Frases cortas y literales. Sin metáforas y sin cerrar párrafos
  con una sentencia ingeniosa.

## El sistema visual

Las seis reglas están al tope de [`src/app/globals.css`](src/app/globals.css).
La que más sorprende: **tres colores categóricos es un techo, no una
preferencia**. Un cuarto hue rompe la separación mínima para daltonismo en modo
oscuro — se probó con violeta, magenta, rojo y amarillo, y los cuatro fallan.
Por eso el grupo "Herramientas" va en gris.

Los colores categóricos se usan como fondo y borde, nunca como color de texto:
están validados para distinguirse entre sí, no para leerse sobre el fondo.

## Capturas de los proyectos

Las ventanas de proyecto muestran el deploy real. Para regenerarlas:

```bash
npm run capturas
```

Usa Chrome headless contra cada URL y escribe en `public/shot-*.png`. Las
capturas se commitean: son contenido, no un artefacto de build. Correlo cuando
redeployes alguno de esos sitios.

Las fechas de "creado" y "actualizado" están hardcodeadas en `perfil.ts` y hay
que actualizarlas a mano.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```
