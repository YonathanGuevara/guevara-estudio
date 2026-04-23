# Sitio Web - Cr. Yonathan Guevara · Contador Público

## Cómo correr el proyecto

### Requisitos
- Node.js 18 o superior
- npm o pnpm

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

### Compilar para producción

```bash
npm run build
# Los archivos quedan en la carpeta /dist
```

---

## Cambios respecto al original (Readdy.ai)

### ✅ Formulario de contacto → WhatsApp
El formulario ahora arma un mensaje con todos los datos del cliente
y abre WhatsApp directamente. El cliente solo tiene que tocar "Enviar".

### ✅ Newsletter del Footer → WhatsApp
El campo de suscripción también redirige a WhatsApp con el email del usuario.

### ✅ Imágenes de fondo → Gradientes CSS
Las imágenes de fondo generadas por Readdy fueron reemplazadas
por gradientes CSS equivalentes. No dependen de ningún servicio externo.

### ✅ Tu foto personal (Sobre mí)
La foto de perfil sigue usando la URL de static.readdy.ai que es tuya.
Cuando tengas hosting propio, reemplazala por una URL propia.

### ✅ Tu logo
El logo también sigue en static.readdy.ai. Reemplazalo cuando tengas hosting.

---

## Dónde alojar el sitio (opciones gratuitas)

| Servicio | Gratis | Dominio propio |
|----------|--------|----------------|
| **Vercel** | ✅ Gratis | ✅ Sí |
| **Netlify** | ✅ Gratis | ✅ Sí |
| **GitHub Pages** | ✅ Gratis | ✅ Sí |

Recomendamos **Vercel** — es el más fácil para proyectos Vite/React.

---

## Personalización rápida

- **Número de WhatsApp**: buscar `5492954321876` y reemplazar por el tuyo
- **Email**: buscar `ygasistenciacontable@gmail.com`  
- **Logo**: reemplazar `LOGO_URL` en `Navbar.tsx` y `Footer.tsx`
- **Foto**: reemplazar `PHOTO_URL` en `AboutHero.tsx`
- **CUIT y matrícula**: editar `Footer.tsx` al final
