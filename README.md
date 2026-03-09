# 📝 ThinkBoard – Gestión de Notas
ThinkBoard es una aplicación web full-stack diseñada para la gestión personal de notas, desarrollada con un enfoque en la estética moderna y una arquitectura robusta. El proyecto combina un backend escalable en Node.js con una interfaz de usuario vibrante que utiliza efectos de transparencia y resplandores neón.

---

## 📌 Contexto del Proyecto

Este proyecto fue desarrollado como parte de un proceso de especialización en desarrollo **MERN Stack** (MongoDB, Express, React, Node.js) utilizando **TypeScript** para garantizar la seguridad de tipos en todo el ciclo de vida de la aplicación. Se puso especial énfasis en superar desafíos técnicos como:

- Gestión de estados complejos y tipado estricto con interfaces de TypeScript.
- Configuración de entornos de producción y despliegue unificado mediante scripts de automatización.
- Optimización de la experiencia de usuario (UX) mediante animaciones y feedback visual inmediato.

---

## 🎯 Objetivos del Sistema

- Ofrecer una plataforma intuitiva para crear, editar y eliminar notas en tiempo real.
- Garantizar la persistencia de datos mediante una base de datos NoSQL alojada en la nube.
- Implementar una interfaz visualmente atractiva utilizando el tema **"Sunset"** de DaisyUI.
- Asegurar la escalabilidad del backend mediante una estructura de rutas y controladores clara.
- Validar la integridad de los datos mediante el uso riguroso de tipos primitivos de TypeScript (evitando objetos `String` globales).

---

## 🏗️ Arquitectura

La aplicación sigue un modelo de arquitectura desacoplada, facilitando el mantenimiento independiente de sus partes:

- **Backend (API REST):** Estructurado en capas de Rutas, Controladores y Modelos de datos de Mongoose.
- **Frontend (SPA):** Desarrollado con React 19 y una gestión de navegación dinámica mediante React Router.
- **Seguridad:** Implementación de limitadores de tasa (Rate Limiting) y políticas de CORS configurables según el entorno.
- **Estética:** Uso de Tailwind CSS para el diseño de componentes personalizados y efectos de brillo (glow) radial en el fondo.

---

## 🧩 Funcionalidades Principales

- ⚡ **CRUD Completo:** Creación, lectura, actualización y borrado de notas vinculadas a identificadores únicos de MongoDB (`_id`).
- 🎨 **Interfaz Sunset:** Diseño oscuro con gradientes radiales y resplandores neón estratégicamente posicionados.
- 🪄 **Efecto de Resaltado:** Identificación visual clara de la nota activa mediante efectos de elevación (`translate-y`) y sombras dinámicas.
- 📱 **Diseño Responsive:** Adaptabilidad total a dispositivos móviles y escritorio mediante el sistema de grillas de Tailwind.
- ✅ **Validación de Tipos:** Manejo estricto de eventos de formulario y estados nulos para prevenir errores en tiempo de ejecución.
- 🚀 **Despliegue Optimizado:** Configuración de rutas "catch-all" para servir el frontend de React desde el servidor de Express en producción.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **Mongoose** (Modelado de datos para MongoDB)
- **Dotenv** (Gestión de variables de entorno)
- **Cors** & **Rate-limiter** (Seguridad y acceso)

### Frontend
- **React 19**
- **TypeScript**
- **Tailwind CSS** & **DaisyUI**
- **Lucide React** (Iconografía moderna)
- **React Router** (Navegación entre páginas)
- **Axios** (Cliente HTTP para comunicación con la API)

### Base de Datos y Herramientas
- **MongoDB Atlas** (Base de datos en la nube)
- **Vite** (Herramienta de construcción y desarrollo rápido)
- **Postman** (Testing exhaustivo de los endpoints de la API)
