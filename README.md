
# ABRO — Production Portfolio & AI Engineering Showcase

![Production Status](https://img.shields.io/badge/Production-Live-brightgreen)
![Framework](https://img.shields.io/badge/Next.js-16_App_Router-black)
![Graphics](https://img.shields.io/badge/3D-React_Three_Fiber-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**Live Production URL**: [https://portfolio-v3-abro.vercel.app](https://portfolio-v3-abro.vercel.app)  
**Author**: Abdoul-Madjid BAWA(ABRO)  
**Track**: General AI Fluency & Frontend Engineering (Week 8 Capstone)  

---

## 🎯 Target Audience & Purpose

This application serves as a high-performance personal engineering showcase designed for technical recruiters, engineering managers, and clients. It demonstrates the seamless integration of custom WebGL/GLSL shader graphics, defensive serverless API hygiene, and modern React 19 / Next.js 16 architectures.

---

## 🏗️ Architecture Sketch


```

[ Client Browser ]
│
├── WebGL Canvas (React Three Fiber + Custom GLSL Fragment Shader)
│      │── Adaptive Resolution (DPR capped at 1.5)
│      └── Accessibility Guard (prefers-reduced-motion fallback)
│
└── API Route Handler (`/api/chat`)
│── Input Cap Enforcement (Max 500 characters)
│── IP Rate Limiting (In-Memory, 10 req/min)
└── Vercel Execution Duration Guard (`maxDuration = 30`)

```

---

## 📊 V2 Evaluation Results & Performance Metrics

- **Graphics Performance**: Stable 60 FPS GLSL shader rendering across desktop and mobile browsers.
- **Security & Rate Control**: 100% interception of oversized payloads (>500 chars) returning HTTP 400, and HTTP 429 upon exceeding 10 requests/minute.
- **Accessibility**: Instantaneous 0ms fallback to a static CSS gradient when `prefers-reduced-motion` is enabled at the OS level.
- **Cross-Browser Verification**: Fully verified layout stability on Google Chrome, Mozilla Firefox, Microsoft Edge, and Mobile Safari.

---

## ⚠️ Known Limitations

1. **In-Memory Rate Limiting**: The current rate limiter relies on an in-memory `Map`. On serverless cold starts or multi-region instances, rate limits are not globally shared across edge nodes (upgrading to Upstash Redis is planned for v3).
2. **GPU Intensity on Legacy Mobile Devices**: While capped at `dpr={[1, 1.5]}`, running continuous GLSL trigonometric calculations on older mobile GPUs without hardware acceleration may result in elevated battery usage.

---

## 🛡️ Production Hygiene & Abuse Protection

- **Input Caps**: Requests containing prompts exceeding 500 characters are rejected at the edge.
- **Execution Limits**: All streaming and generative route handlers export `export const maxDuration = 30;` to prevent runaway function charges on Vercel.
- **Rate Control**: Basic IP-based rate limiting prevents automated scraping and credit drain.

---

## 💻 Reproducible Local Setup

To clone and run this project locally, execute the following commands:

```bash
# 1. Clone the repository
git clone [https://github.com/ABRO-code/portfolio-v3.git](https://github.com/ABRO-code/portfolio-v3.git)

# 2. Navigate to the project directory
cd portfolio-v3

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🤖 Transparency & AI Usage Disclosure

In compliance with the AI Fluency Transparency Framework:

* **AI Assistance**: Claude 3.5 Sonnet and Gemini were utilized as pair-programming assistants to draft initial GLSL trigonometric noise algorithms and generate TypeScript boilerplate for serverless rate limiting.
* **Human Engineering & Verification**: All code integration, GLSL uniform wiring (`u_mouse`, `u_resolution`, `u_time`), responsive layout adjustments, accessibility state hooks, and security boundaries were manually engineered, profiled, and verified by me.

---

## 📄 Additional Documentation

* **Signature Shader Report (FE-AA3)**: [`SHADER_HERO.md`](https://www.google.com/search?q=./SHADER_HERO.md)
* **AI Fluency Track Retrospective (FL-10)**: [`RETROSPECTIVE.md`](https://www.google.com/search?q=./RETROSPECTIVE.md)

---

© 2026 BAWA Abdoul-Madjid (ABRO). Released under the MIT License.

