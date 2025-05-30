# PharmaSync Backend

Este es el backend de **PharmaSync**, un asistente farmacéutico inteligente que combina tecnologías modernas para brindar soporte clínico confiable. Está desarrollado en **Java 21+** con **Spring Boot**, utilizando patrones de diseño como **Strategy**, **Facade** y **Decorator** para mantener una arquitectura limpia y escalable. Integra autenticación, persistencia híbrida con **PostgreSQL** y **MongoDB**, y manejo avanzado de interacciones clínicas mediante IA.

---

## 🚀 Tecnologías utilizadas

- Java 21+
- Spring Boot
- Spring Security con JWT
- PostgreSQL (JPA / Hibernate)
- MongoDB (Spring Data MongoDB)
- Apache OpenNLP (para procesamiento NLP)
- Lombok
- RestTemplate (consumo de APIs externas)
- MapStruct (adaptadores y mapeos)
- Diseño basado en patrones: Strategy, Facade, Decorator, Observer

---

## 📦 Estructura del proyecto

```
src/
├── config/           → Configuraciones (seguridad, JWT, etc.)
├── controller/       → Controladores REST (usuarios, chat, admin)
├── dto/              → Data Transfer Objects
├── entity/           → Entidades JPA (PostgreSQL)
├── model/            → Documentos MongoDB y modelos de negocio
├── patterns/         → Implementación de patrones
│   ├── strategy/     → Estrategias para detección y procesamiento clínico
│   ├── facade/       → Orquestador para interacción con agente IA
│   ├── decorator/    → Decoradores para enriquecer respuestas de chat
│   └── observer/     → Observadores para logging y métricas
├── repository/       → Repositorios JPA y MongoDB
├── service/          → Lógica de negocio (persistencia, chat, usuarios)
├── security/         → Seguridad y autenticación
└── exception/        → Manejadores globales de errores
```

---

## 🔐 Roles del sistema

- **ADMIN**: Gestión completa de usuarios, supervisión y administración.  
- **USUARIO**: Acceso a funcionalidades de chat, historial clínico y consultas farmacéuticas.

---

## 🧪 Endpoints principales

### Autenticación

| Método | Ruta           | Descripción                    |
|--------|----------------|--------------------------------|
| POST   | /auth/login    | Login y obtención de JWT       |
| POST   | /auth/register | Registro de nuevos usuarios    |
| POST   | /auth/register-admin | Registro secreto de un admin    |

### Administración (/api/admin)

| Método | Ruta                     | Descripción                          |
|--------|--------------------------|--------------------------------------|
| GET    | /api/admin/users         | Obtener lista de usuarios            |
| DELETE | /api/admin/users/{id}    | Eliminar usuario y datos asociados   |

### Chat y Consulta Clínica (/api/user/chat)

| Método | Ruta                             | Descripción                               |
|--------|----------------------------------|-------------------------------------------|
| POST   | /api/user/chat/send              | Enviar mensaje al asistente IA            |
| GET    | /api/user/chat/sessions          | Obtener sesiones del usuario              |
| GET    | /api/user/chat/history/{id}      | Obtener historial de chat por sesión      |

---

## 🛠️ Inicialización del proyecto

1. Clona el repositorio.  
2. Configura las variables de entorno (MongoDB, PostgreSQL, JWT secret, URLs de agente IA).  
3. Ejecuta el proyecto con:

```bash
./mvnw spring-boot:run
# o si tienes Maven instalado:
mvn spring-boot:run
```

---

## 🧠 Lógica clínica y patrones de diseño

### Strategy
- Detecta tipos de consulta (síntomas, interacciones, consultas generales).
- Usa Apache OpenNLP para normalizar texto y detectar términos médicos con stemming.
- Procesa y resume respuestas clínicas antes de guardarlas y enviarlas.

### Facade
- Orquesta llamadas al agente IA externo.
- Aplica estrategia para seleccionar y procesar respuestas.
- Gestiona persistencia de resumen clínico.

### Decorator
- Enriquecer mensajes con timestamp, tipo de emisor, advertencias, sanitización y pie de página.
- Construcción flexible de mensajes para el frontend.

### Observer
- Logging y métricas en tiempo real de mensajes procesados.
- Observadores desacoplados para ampliar funcionalidades sin tocar el core.

---

## ❗ Control de errores

- Errores controlados y mensajes claros para el frontend con manejo global.
- Validaciones en autenticación, entrada de datos y lógica clínica.

---

## 🔐 Seguridad

- JWT para autenticación y autorización.
- Roles y permisos configurados en Spring Security.
- Filtros para proteger endpoints y controlar accesos.

---
## 🐳 Requisitos y despliegue local con Docker

Para facilitar la ejecución local del backend y sus dependencias, PharmaSync utiliza contenedores Docker para PostgreSQL, MongoDB y el orquestador n8n.

### Requisitos previos

- Tener instalado [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) en tu máquina local.

---

### Levantar servicios con Docker Compose

En la raíz del proyecto se encuentra un archivo `docker-compose.yml` que define los siguientes servicios:

- **PostgreSQL 15** para la base relacional (usuarios, clinical_fact).  
- **MongoDB 6** para almacenamiento de chats, sesiones y clinical summaries.  
- **n8n** como orquestador de flujos.

---

### Comandos para ejecutar localmente

1. Abre una terminal en la carpeta raíz del proyecto donde está el `docker-compose.yml`.  

2. Ejecuta para levantar los contenedores en segundo plano:

```bash
docker-compose up -d
```
---

## ✅ Ejemplo de flujo de chat clínico

**Usuario:** “Me duele la cabeza, ¿qué puedo tomar?”  
**Backend:** selecciona estrategia de síntomas con NLP, valida relevancia.  
**IA:** genera respuesta procesada.  
**Backend:** decora el mensaje con tipo y timestamp.  
**Backend:** guarda resumen clínico solo si la consulta es relevante.  
**Frontend:** muestra la respuesta limpia y estructurada al usuario.

---

## 📬 Contacto

Para dudas o contribuciones, contacta al equipo de desarrollo de **PharmaSync**.
