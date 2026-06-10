# BROMATEC — Landing de dirección técnica bromatológica (Córdoba)

Sitio de una sola página, sin dependencias, con un **panel de administración** integrado
para editar todo el contenido y publicarlo a todos los dispositivos.

- 🌐 **En vivo:** https://leoallfit.github.io/bromatec/
- 📦 **Repo:** https://github.com/leoallfit/bromatec

---

## ✅ Pendientes (lo que falta para dejarlo 100% listo)

1. **Datos de contacto** — hoy son de ejemplo (email `tucorreo@ejemplo.com`, WhatsApp e
   Instagram vacíos). → Panel → **Redes sociales**.
2. **Nombre de marca** — "BROMATEC" es un placeholder. Cambialo por el nombre real. → Panel
   → Hero / Footer / SEO (y el logo si querés, ver más abajo).
3. **CRM Google Sheets** — crear la planilla y pegar la URL en el panel (pasos abajo).
4. **Token de GitHub** — para que tus ediciones del panel se vean en todos los dispositivos
   (pasos abajo). *Si ya publicaste alguna vez, ya lo tenés hecho.*
5. **Contenido real** — estadísticas del hero, testimonios y la foto de fondo son de ejemplo.

---

## Archivos

- `index.html` — la landing completa + el panel de administración.
- `formulario.html` — formulario de contacto (se abre desde los botones).
- `privacidad.html` / `terminos.html` — páginas legales.
- `favicon.svg` — ícono (matraz de laboratorio).
- `apps-script-crm.gs` — código del CRM para pegar en Google Apps Script.

## Cómo verla localmente

```
python -m http.server 5577 --directory C:\Users\leone\web-bromatologia
```
y entrá a http://localhost:5577

> El login del panel y la sincronización **no funcionan con `file://`**; usá `localhost` o el sitio publicado.

---

## Panel de administración

1. En la página, **triple clic en la esquina inferior izquierda** (zona invisible).
2. Contraseña: **`bromatec2026`** (cambiala desde el panel → Sincronización).
3. Editás todo: Hero, Servicios, Pilares, Testimonios (incluido su encabezado), Colores,
   Redes, Formulario, CTA, Footer, **SEO** (título/descripción de la pestaña) y los
   **rótulos** de cada sección.
4. Tocás **💾 Guardar cambios**. Si tenés el token configurado, se publica solo.

---

## Que los cambios se vean en TODOS los dispositivos (token)

Los cambios del panel se guardan en tu navegador y, si configurás el token, se **publican**
a un archivo `config.json` en el repo que todos los dispositivos leen al cargar.

El repositorio ya viene fijado (`leoallfit/bromatec`), así que solo necesitás el token **una vez**:

1. GitHub → tu foto → **Settings** → (abajo) **Developer settings**.
2. **Personal access tokens → Tokens (classic)** → **Generate new token (classic)**.
3. Nombre: `bromatec` · tildá el permiso **repo** · **Generate** · copiá el token (`ghp_…`).
4. En el sitio: panel → pestaña **Sincronización** → pegá el token → **☁️ Publicar cambios**.

Desde ahí, cada "Guardar" del panel se publica solo para todos.

---

## CRM: que los leads caigan en una Google Sheets

Cada persona que complete el formulario aparece como una **fila nueva** en tu planilla, con
**Fecha** y un **Estado** editable (Nuevo → Contactado → Visita agendada → Cliente…).

1. Entrá a **sheets.new** → creá una planilla.
2. En la planilla: **Extensiones → Apps Script**.
3. Borrá lo que haya y **pegá todo el archivo `apps-script-crm.gs`**. Guardá.
4. **Implementar → Nueva implementación → ⚙ → Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
   - **Implementar** → autorizá la primera vez → copiá la **URL** (termina en `/exec`).
5. En el sitio: panel → **Formulario** → campo **"CRM · Google Sheets"** → pegá la URL →
   **Guardar** → **Publicar** (token).

> El formulario funciona **solo con esto** (no hace falta Formspree). Si además querés que te
> llegue un mail por cada lead, descomentá la línea `MailApp.sendEmail(...)` en el script y
> poné tu correo.

---

## Cambiar el nombre de la marca (logo)

El texto del logo se edita en el código (es la única parte no editable desde el panel):
en `index.html`, `formulario.html`, `privacidad.html` y `terminos.html` buscá
`BROMA<span>TEC</span>` y reemplazá por tu marca. (El resto de textos van por el panel.)

---

## Identidad visual

- Tipografía: **Spectral** (títulos, serif) + **Inter** (cuerpo).
- Colores: verde profundo `#0C3B26` / acento `#15803D` / dorado `#C9A95C` (editables en el panel).
