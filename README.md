## 🏋️ HarFit App

HarFit es una aplicación de seguimiento de entrenamientos de gimnasio inspirada en Hevy.

La aplicación permite a los usuarios:

- Registrar rutinas de entrenamiento
- Anotar ejercicios y series
- Monitorear el progreso a lo largo del tiempo

## 📐 Arquitectura

React Native + Expo Router

Arquitectura basada en **Atomic Design + Modular Architecture**

El proyecto separa claramente:

- 🎨 UI (Atomic Design)
- 🧠 Lógica de negocio (Modules)
- 🌐 Infraestructura (API, adapters)
- 📱 Navegación (Expo Router)

---

## 📂 Estructura

```bash
src/
 ├── app/               # Pages (Expo Router)
 ├── components/        # Atomic Design (UI)
 │   ├── atoms/
 │   ├── molecules/
 │   ├── organisms/
 │   └── templates/
 │
 ├── modules/           # Lógica de negocio por feature
 │   ├── auth/
 │   │   ├── services/
 │   │   ├── store/
 │   │   └── validation/
 │   ├── exercise/
 │   └── routine/
 │
 ├── api/               # Configuración Axios
 ├── adapters/          # Adaptadores (storage, etc.)
 ├── infrastructure/    # Interfaces / contratos
 ├── hooks/             # Hooks globales
 ├── constants/
 └── utils/
```

---

## 🎨 UI — Atomic Design

- **Atoms** → Componentes básicos (Button, TextTheme, Input)
- **Molecules** → Composición de átomos
- **Organisms** → Componentes complejos (LoginForm, ExerciseList)
- **Templates** → Layouts reutilizables

La UI **no contiene lógica de negocio**.

---

## 🧠 Modules

Cada feature vive en su propio módulo.

Ejemplo:

```bash
modules/auth/
 ├── services/      # Llamadas a API / lógica aplicación
 ├── store/         # Estado del módulo
 └── validation/    # Esquemas de formulario (Zod)
```

Los módulos:

- No dependen de componentes
- Contienen la lógica del negocio
- Son independientes entre sí

---

## 📱 Pages (Expo Router)

Ubicación: `src/app/`

Responsabilidades:

- Leer parámetros
- Usar hooks del módulo
- Renderizar componentes

Las Pages solo orquestan.

---

## 🔄 Flujo

```
Page (app/)
   ↓
Module Hook
   ↓
Service
   ↓
API / Adapter
   ↓
Respuesta → UI
```

---

## 🏛 Principios

- Separación de responsabilidades
- Bajo acoplamiento
- Modularidad por feature
- UI desacoplada del negocio
- Escalable para proyectos medianos/grandes

---

## 🚀 Main Tech Stack

- **React Native 0.81**
- **Expo SDK 54**
- **Expo Router 6**
- **TypeScript**
- **NativeWind (TailwindCSS for React Native)**
- **Zustand** (State Management)
- **TanStack React Query** (Server State)
- **React Hook Form**
- **Zod** (Schema Validation)
- **Axios**

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```
