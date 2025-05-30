# PharmaSync Frontend

## Descripción General

PharmaSync es una plataforma avanzada de asistencia farmacéutica que utiliza inteligencia artificial para responder consultas médicas y farmacológicas. Este repositorio contiene el frontend de la aplicación, desarrollado con **React**, **Vite** y **Tailwind CSS**, diseñado para interactuar con un backend REST que maneja autenticación, sesiones de chat y gestión de usuarios.

---

## Tecnologías Usadas

- **React 18+**: Librería principal para construcción de la interfaz.
- **Vite**: Herramienta moderna para desarrollo y bundling.
- **Tailwind CSS**: Framework CSS para estilos utilitarios y responsivos.
- **TypeScript**: Para tipado estático y mejor mantenimiento del código.
- **React Router DOM**: Manejo de rutas, incluyendo rutas protegidas y basadas en roles.
- **JWT (JSON Web Tokens)**: Autenticación y autorización segura con tokens almacenados en localStorage.
- **Axios / Fetch API**: Para comunicación con el backend REST.
- **Estructuras de Datos Personalizadas**: Implementación de listas doblemente enlazadas para navegación entre sesiones de chat.

---

## Estructura del Proyecto

```
/src
 ├── /components      # Componentes UI reutilizables (botones, badges, inputs, etc.)
 ├── /contexts        # Contextos React para autenticación y estado global
 ├── /dataStructures  # Implementación de estructuras como DoublyLinkedList
 ├── /hooks           # Custom hooks (e.g., para autenticación o fetch de datos)
 ├── /lib             # Funciones auxiliares para API, tipos y clientes HTTP
 ├── /pages           # Vistas y páginas principales (Login, Register, Chat, Admin)
 ├── /styles          # Archivos CSS y configuración Tailwind
 ├── App.tsx          # Componente raíz con rutas y lógica base
 ├── main.tsx         # Entrada principal de la app (render React)
 └── vite.config.ts   # Configuración de Vite
```

---

## Características Principales

### 1. Autenticación y Autorización

- Registro y login a través de endpoints `/api/auth/register` y `/api/auth/login`.
- Almacenamiento seguro del JWT en `localStorage`.
- Contexto React (`AuthContext`) que provee usuario y funciones para login/logout.
- Rutas protegidas según rol (`USER` y `ADMIN`).
- Endpoint `/api/auth/me` para obtener la sesión actual del usuario autenticado.

### 2. Chat Médico Asistido por IA

- Listado de sesiones de chat consultado desde `/api/user/chat/sessions`.
- Visualización de mensajes en la sesión seleccionada (`/api/user/chat/history/{sessionId}`).
- Envío de mensajes mediante POST a `/api/user/chat/send` con `content` y `sessionId`.
- Funcionalidad para eliminar sesiones de chat.
- Uso de lista doblemente enlazada (`DoublyLinkedList`) para navegación entre múltiples sesiones, con flechas para avanzar y retroceder sin perder contexto.
- Gestión de estados de carga y errores en llamadas API para mejor experiencia UX.

### 3. Panel Administrativo (solo ADMIN)

- Listado y gestión de usuarios mediante endpoints `/api/admin/users` y `/api/admin/users/{id}`.
- Capacidad para eliminar usuarios directamente desde la UI.
- Rutas y componentes protegidos para roles administrativos.

---

## Manejo del Estado

- Se utiliza **React Context** para autenticación y estado global del usuario.
- Los datos de chat y sesiones se manejan con `useState` y `useEffect`.
- Las listas doblemente enlazadas facilitan la navegación entre sesiones sin necesidad de recargar datos constantemente.

---

## Estilos y Diseño UI

- Uso extensivo de **Tailwind CSS** para estilos rápidos, responsivos y consistentes.
- Componentes modulares y reutilizables (Botones, TextAreas, Badges, Alerts).
- Iconografía integrada con librerías como `lucide-react`.
- Diseño limpio y enfocado en usabilidad para consultas médicas.

---

## Instrucciones para Desarrollo Local

### Requisitos Previos

- Node.js >= 16
- npm o yarn
- Backend corriendo y accesible (asegúrate que la API REST esté funcionando)

### Pasos para ejecutar

```bash
# Clonar repositorio y entrar en carpeta
git clone <url-del-repo>
cd frontend

# Instalar dependencias
npm install
# o
yarn install

# Iniciar servidor de desarrollo
npm run dev
# o
yarn dev
```

La aplicación quedará disponible típicamente en http://localhost:3000 o el puerto configurado por Vite.

---

## Comandos Útiles

- `npm run dev` — Inicia el servidor en modo desarrollo con hot reload.
- `npm run build` — Construye el proyecto para producción.
- `npm run preview` — Sirve la versión de producción localmente.
- `npm run lint` — Ejecuta el linter para verificar estilo y errores.

---

## Integración con Backend

- Las URLs y configuración base del backend están en `/src/lib/api.ts`.
- Todas las llamadas HTTP usan Axios o Fetch con manejo centralizado de tokens JWT para autorización.
- La autenticación se valida en el contexto global para controlar acceso a rutas y componentes.

---

## Estructura de Datos Destacada

- La implementación de **DoublyLinkedList** permite al usuario navegar fácilmente entre múltiples chats guardados sin recargar todo.
- Esta lista está integrada con el estado de React para mantener sincronía visual y funcional.
- Las flechas para navegación usan esta estructura para cambiar el chat actual mostrando el historial respectivo.

---

## Manejo de Errores y Estados de Carga

- Las llamadas API cuentan con manejo de errores para mostrar alertas UI en caso de fallos.
- Estados de carga (loading) se reflejan en botones e inputs para evitar acciones múltiples.
- Mensajes de error son claros y orientados al usuario final.

---

## Buenas Prácticas y Recomendaciones

- Mantener el token JWT seguro y renovarlo cuando sea necesario.
- Controlar el acceso a rutas sensibles en frontend para evitar accesos indebidos.
- Modularizar componentes para mantener la escalabilidad.
- Aprovechar el poder de Tailwind para estilos consistentes sin CSS personalizado extensivo.

---

## Contacto y Contribución

Para dudas o contribuciones, por favor contactar con el equipo de desarrollo o crear un issue en el repositorio.

---
