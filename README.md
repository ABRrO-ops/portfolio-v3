
# ABRO — Production Portfolio & AI Engineering Showcase

![Production Status](https://img.shields.io/badge/Production-Live-brightgreen)
![Framework](https://img.shields.io/badge/Next.js-16_App_Router-black)
![Graphics](https://img.shields.io/badge/3D-React_Three_Fiber-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**Live Production URL**: [https://portfolio-v3-abro.vercel.app](https://portfolio-v3-abro.vercel.app)  
**Author**: Abdoul-Madjid BAWA(ABRO)  
**Track**: Frontend AI Engineering

---

## 📌 Project Overview
This project is a high-performance personal engineering portfolio built with Next.js 16 (App Router), Three.js, React Three Fiber, and Tailwind CSS. It highlights interactive WebGL/GLSL shader workflows, modular architectural patterns, and AI integration routes designed with strict production hygiene.

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


## 🛡️ Production Hygiene & Abuse Protection

- **Rate Limiting**: API routes feature an in-memory IP-based rate limiter capping incoming requests to **10 calls/minute** to protect API credit drain.
- **Input Caps**: Prompts sent to AI endpoints are strictly capped at **500 characters** to prevent token abuse.
- **Serverless Duration Control**: Streaming and generation handlers are configured with `export const maxDuration = 30` to prevent infinite-hanging function execution.
- **Cross-Browser Testing**: Verified layout rendering and WebGL shader stability on Chrome, Firefox, Edge, and Mobile Safari.

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

## 💡 Usage Examples

- **Example 1 — Dynamic Track & Milestones Filtering:** 
  Visitors can navigate through the interactive timeline on the About page to explore academic achievements, hackathon projects, and technical cohorts. The application dynamically fetches and renders experiences from Supabase alongside static entries.

- **Example 2 — Interactive 3D Portfolio & Timeline Navigation:** 
  Visitors can interact with the 3D canvas viewport to explore software projects, filter experience milestones by category (e.g., Hackathons, Education, AI Cohorts), and trigger direct modal previews of project source code and live deployments.

  ---

## 📊 V2 Eval Results & Metrics
- **Performance:** 48/100 (Bottlenecks identified: 3D canvas hydration & font loading)
- **Accessibility:** 89/100
- **Best Practices:** 100/100
- **SEO:** 80/100

---

## 🤖 Honest "How AI Tools Built This" Disclosure

AI tools (specifically Claude 3.5 Sonnet and Gemini) were utilized throughout the development lifecycle:

* **WebGL & GLSL Shaders**: Generated base vertex and fragment shader noise code, which was manually adapted for resolution scaling (`u_resolution`) and cursor interaction (`u_mouse`).
* **Debugging & Syntax Adaptations**: Assisted in converting legacy Three.js canvas configurations to React Three Fiber standards inside Next.js Client Components.
* **Documentation & Tests**: Generated boilerplate Markdown structures and API rate-limiting guardrail schemas.
* **Human Developer Role**: Code integration, layout design, responsive adjustments, state management, performance profiling (`prefers-reduced-motion` integration), and deployment verification.

---

## 📝 License & Author

Created by Abdoul-Madjid BAWA (ABRO) — Front-end AI Engineering.