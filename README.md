# PharmaSync - Plataforma de Asistencia Farmacéutica Inteligente

## Descripción General

PharmaSync es una plataforma avanzada de asistencia farmacéutica que utiliza inteligencia artificial para proporcionar soporte clínico confiable y respuestas precisas sobre consultas médicas y farmacológicas. 

Está compuesta por un backend robusto desarrollado en Java 21+ con Spring Boot que implementa patrones de diseño (Strategy, Facade, Decorator, Observer) para mantener una arquitectura limpia, segura y escalable; y un frontend moderno desarrollado con React, Vite y Tailwind CSS que ofrece una experiencia de usuario ágil, intuitiva y segura.

---

## Tecnologías Principales

### Backend

- **Java 21+** con **Spring Boot**
- **Spring Security** con JWT para autenticación y autorización
- **PostgreSQL** (JPA / Hibernate) para datos relacionales
- **MongoDB** para almacenamiento de chats, sesiones y resúmenes clínicos
- **Apache OpenNLP** para procesamiento de lenguaje natural (NLP) en consultas médicas
- **MapStruct, Lombok**
- Patrones de diseño: Strategy, Facade, Decorator, Observer
- Consumo de APIs externas con RestTemplate

### Frontend

- **React 18+** con **TypeScript**
- **Vite** para bundling y desarrollo rápido
- **Tailwind CSS** para estilos utilitarios y responsivos
- **React Router DOM** para manejo avanzado de rutas protegidas y basadas en roles
- **Axios / Fetch** para comunicación con backend REST
- Implementación de estructuras de datos personalizadas (lista doblemente enlazada) para navegación en chat

---

## Estructura del Proyecto

### Backend

```
src/
├── config/           # Configuraciones (seguridad, JWT, etc.)
├── controller/       # Controladores REST (usuarios, chat, admin)
├── dto/              # Data Transfer Objects
├── entity/           # Entidades JPA (PostgreSQL)
├── model/            # Documentos MongoDB y modelos de negocio
├── patterns/         # Implementación de patrones (strategy, facade, decorator, observer)
├── repository/       # Repositorios JPA y MongoDB
├── service/          # Lógica de negocio
├── security/         # Seguridad y autenticación
└── exception/        # Manejadores globales de errores
```

### Frontend

```
/src
 ├── /components      # Componentes UI reutilizables
 ├── /contexts        # Contextos React para autenticación y estado global
 ├── /dataStructures  # Implementación de estructuras como DoublyLinkedList
 ├── /hooks           # Custom hooks
 ├── /lib             # Funciones auxiliares para API, tipos y clientes HTTP
 ├── /pages           # Páginas principales (Login, Register, Chat, Admin)
 ├── /styles          # Configuración Tailwind y CSS
 ├── App.tsx          # Componente raíz con rutas
 ├── main.tsx         # Punto de entrada React
 └── vite.config.ts   # Configuración Vite
```

---

## Funcionalidades Clave

### Backend

- Autenticación y autorización segura con roles ADMIN y USUARIO.
- Gestión de usuarios, administración y control de accesos.
- Procesamiento inteligente de consultas clínicas usando NLP y estrategias específicas.
- Orquestación de agentes IA mediante patrón Facade.
- Enriquecimiento de mensajes con Decorator para añadir metadatos y validaciones.
- Observadores para logging y métricas en tiempo real.
- Persistencia híbrida con PostgreSQL y MongoDB.
- APIs REST para chat, sesiones, usuarios y administración.

### Frontend

- Registro, login y manejo seguro de JWT.
- Navegación protegida basada en roles.
- Chat asistido por IA con historial de sesiones.
- Navegación entre múltiples sesiones de chat mediante lista doblemente enlazada.
- Administración de usuarios para roles ADMIN.
- Manejo robusto de estados de carga, errores y respuestas.
- UI responsiva y moderna con Tailwind CSS.

---

## Instalación y Ejecución

### Backend

1. Clonar repositorio y configurar variables de entorno (MongoDB, PostgreSQL, JWT secret, URLs de agente IA).
2. Ejecutar con Maven:

```bash
./mvnw spring-boot:run
# o si tienes Maven instalado:
mvn spring-boot:run
```

3. Opcional: Usar Docker y Docker Compose para levantar PostgreSQL, MongoDB y orquestador n8n.

```bash
docker-compose up -d
```

### Frontend

1. Clonar repositorio y entrar en la carpeta frontend.

```bash
git clone https://github.com/SantiagoArTyrs/PharmaSync.git
cd frontend
```

2. Instalar dependencias.

```bash
npm install
# o yarn install
```

3. Ejecutar servidor de desarrollo.

```bash
npm run dev
```

4. Acceder a http://localhost:3000 (o el puerto configurado).

---

## Buenas Prácticas y Recomendaciones

- Mantener el JWT seguro y refrescarlo según corresponda.
- Controlar accesos en backend y frontend para proteger rutas sensibles.
- Modularizar código para facilitar mantenimiento y escalabilidad.
- Manejar errores y estados de carga para mejorar experiencia de usuario.
- Usar patrones de diseño para separar responsabilidades y facilitar extensibilidad.
- Aprovechar Tailwind CSS para mantener consistencia visual sin sobrecargar con CSS personalizado.

---

## Contacto y Contribuciones

Para dudas, reportes o colaboraciones, contacta con el equipo de PharmaSync o abre issues en los repositorios correspondientes.

---

Este README unificado refleja toda la arquitectura, tecnologías y flujo de trabajo que componen PharmaSync como plataforma integral de asistencia farmacéutica basada en IA.
