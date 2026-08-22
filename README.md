
# ABRO — Personal Portfolio & AI Engineering Showcase

A modern, high-performance developer portfolio built with **Next.js (App Router)**, **React Three Fiber**, **Three.js**, and **Tailwind CSS**. It features custom WebGL/GLSL shader animations, interactive 3D elements, and a clean architecture ready for AI-driven workflows.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **3D & Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Styling**: Tailwind CSS, Framer Motion
- **Deployment**: Vercel

---

## 🚀 Key Features

- **Signature Shader Hero (FE-AA3)**: Interactive GLSL fragment shader background driven by dynamic uniforms (`u_time`, `u_mouse`, `u_resolution`).
- **Accessibility & Motion Safety**: Native support for system preferences via `prefers-reduced-motion` (graceful fallback to a static CSS gradient).
- **Performance Optimization**: WebGL render capping (`dpr={[1, 1.5]}`) to ensure high FPS across Retina and high-res screens.

---

## 💻 Local Development

1. Install project dependencies:
    ```bash
   npm install

    ```

2. Start the local development server:
    ```bash
    npm run dev

    ```


3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Assignment Report

The documentation and technical breakdown for assignment **FE-AA3 (Signature Hero Shader)** can be found in [`SHADER_HERO.md`](https://www.google.com/search?q=./SHADER_HERO.md).

---

© 2026 BAWA Abdoul-Madjid (ABRO).

