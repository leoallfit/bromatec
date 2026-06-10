# BROMATEC — Landing de dirección técnica bromatológica (Córdoba)

Copia de la estructura de **leoallfit.com.ar**, adaptada al rubro de bromatología /
dirección técnica presencial. Todo el contenido es editable desde un panel de
administración, igual que la web original.

## Archivos

- `index.html` — la landing completa (una sola página, sin dependencias).
- `formulario.html` — formulario de contacto (se abre desde los botones de la landing).
- `privacidad.html` / `terminos.html` — páginas legales.
- `favicon.svg` — ícono del sitio.
- `apps-script.js` — script opcional de Google Sheets para guardar los leads.

## Cómo verla

Abrí `index.html` directamente en el navegador, o levantá un servidor local:

```
python -m http.server 5577 --directory C:\Users\leone\web-bromatologia
```

y entrá a http://localhost:5577

> Nota: el login del panel y la sincronización con GitHub **no funcionan abriendo el
> archivo con `file://`**; necesitan `http://localhost` o el sitio publicado.

## Panel de administración (editar textos, colores, etc.)

1. En la página, hacé **triple clic en la esquina inferior izquierda** (zona invisible).
2. Contraseña por defecto: **`bromatec2026`** (cambiala desde el panel → Sincronización).
3. Desde ahí editás: Hero, Servicios, "Por qué yo", Testimonios, Colores, Redes,
   Formulario y el footer.

## Lo que es PLACEHOLDER y conviene reemplazar

- **Marca "BROMATEC"** — es un nombre de relleno. Cambialo por el nombre real (del
  bromatólogo o de la marca) en el panel y en el logo.
- **Datos de contacto** — email, WhatsApp e Instagram están vacíos o de ejemplo
  (`tucorreo@ejemplo.com`). Cargalos en el panel → Redes sociales.
- **Estadísticas del hero** ("+10 años", etc.), **testimonios** y **fotos** — son de
  ejemplo. Reemplazalos por casos reales.
- **Imagen de fondo del hero** — apunta a una foto genérica de Unsplash; podés cambiarla
  por una propia en el panel.

## Para que el formulario envíe los leads (importante)

Hoy el formulario **no envía a nadie** (se quitaron los datos de Leo a propósito).
Para activarlo:

1. Creá una cuenta gratis en https://formspree.io → New Form → copiá el ID.
2. En `formulario.html` reemplazá `TU_FORM_ID` (en `formspree.io/f/TU_FORM_ID`) por ese ID.
3. (Opcional) En el panel → Formulario, cargá el mismo ID en "Integración Formspree".

## Para publicarlo con dominio (GitHub Pages)

1. Creá un repo en GitHub y subí estos archivos.
2. Settings → Pages → Branch `main`. (Opcional: agregá un archivo `CNAME` con el dominio.)
3. Configurá la **fuente de guardado** desde el panel (ver abajo) — ya no hace falta tocar el código.

## Fuente de guardado (dónde se guarda/publica la config)

Por defecto los cambios del panel se guardan **solo en tu navegador**. Para que se publiquen
para todos los visitantes, configurá el repositorio de GitHub desde el panel:

1. Abrí el panel → pestaña **Sincronización**.
2. En **"Fuente de guardado (repositorio)"** escribí tu repo con formato `usuario/repositorio`
   (ej: `juanperez/bromatec-web`) y tocá **💾 Guardar repositorio**.
3. Debajo, pegá tu **GitHub Token** (seguí los pasos de esa misma pantalla) y tocá
   **☁️ Publicar cambios**.

> Si dejás el repositorio vacío, todo funciona igual pero los cambios quedan solo en ese
> navegador (no se sincronizan ni se publican). El formulario también usa este mismo repo.

## Detalle a revisar (heredado de la web original)

`index.html` y `formulario.html` traen un script "anti-inspección" que **borra la página
si detecta herramientas de desarrollador**. Funciona, pero puede dispararse por error en
algunos navegadores/zoom. Si te da problemas, se puede quitar la función
`detectDevTools(...)` al final del `<script>`.
