# ParKpool - Landing Page

Sistema de Landing Page para ParKpool, el sistema operativo para empresas de valet parking.

## 🚀 Características

- ✅ Landing page moderna con diseño "Antigravity"
- ✅ Modal de captura de leads con validación
- ✅ Página de Términos y Condiciones
- ✅ Base de datos SQLite con Prisma
- ✅ API pública para registro de leads
- ✅ Colores de marca: Azure Blue (#0A62F8) y Midnight Navy (#0B2848)

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Base de Datos:** SQLite + Prisma ORM
- **Iconos:** Lucide React
- **Tipografía:** Noto Sans (Google Fonts)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar base de datos
cd prisma
npx prisma db push
npx prisma generate

# Ejecutar en desarrollo
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── api/v1/public/     # API endpoints públicas
│   ├── terms/             # Página de términos
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página home
├── components/            # Componentes React
│   ├── LandingPage.tsx   # Componente principal de landing
│   └── DemoRequestModal.tsx # Modal de solicitud de demo
├── prisma/               # Prisma ORM
│   └── schema.prisma     # Esquema de base de datos
└── messages/             # Archivos de traducción (preparado para i18n)
    ├── es.json
    └── en.json
```

## 🗄️ Base de Datos

El proyecto usa Prisma con SQLite para almacenar leads:

```prisma
model Lead {
  id          String   @id @default(uuid())
  name        String
  email       String   @unique
  companyName String
  phone       String?
  status      String   @default("NEW")
  createdAt   DateTime @default(now())
}
```

## 🌐 API Endpoints

### POST /api/v1/public/leads
Crea un nuevo lead desde el formulario de la landing page.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "companyName": "JV Parking",
  "phone": "+57 300 123 4567"
}
```

## 🎨 Diseño

El diseño sigue los principios "Antigravity":
- Limpio y moderno
- Colores vibrantes de marca
- Animaciones suaves con Framer Motion
- Responsive design

## 📝 To-Do

- [ ] Implementar i18n completo (ES/EN)
- [ ] Agregar email notifications para leads
- [ ] Integrar con CRM
- [ ] Deploy a producción
- [ ] Migrar de SQLite a PostgreSQL

## 👥 Autor

Desarrollado para ParKpool
