# ABRO — Production Portfolio & AI Engineering Platform

![Build Status](https://img.shields.io/badge/Production-Deployed-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![License](https://img.shields.io/badge/License-MIT-blue)

**Live Production URL**: [https://portfolio-v3-abro.vercel.app](https://portfolio-v3-abro.vercel.app)

---

## 📌 Project Overview
This project is a high-performance personal engineering portfolio built with Next.js 16 (App Router), Three.js, React Three Fiber, and Tailwind CSS. It highlights interactive WebGL/GLSL shader workflows, modular architectural patterns, and AI integration routes designed with strict production hygiene.

---

## 🛠️ Architecture & Tech Stack
- **Framework**: Next.js 16 (App Router, Server Components)
- **3D / Shader Engine**: Three.js, `@react-three/fiber`
- **Styling & Motion**: Tailwind CSS, Framer Motion
- **Deployment**: Vercel Platform

---

## 🔑 Environment Variables

To run this project locally or deploy it to production, configure the following environment variables in a `.env.local` file:

| Variable | Description | Required | Example |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Base canonical URL of the deployment | Yes | `https://portfolio-v3-abro.vercel.app` |
| `OPENAI_API_KEY` | Key for server-side AI completion routes | Optional | `sk-proj-...` |

---

## 🛡️ Production Hygiene & Abuse Protection
- **Rate Limiting**: API routes feature an in-memory IP-based rate limiter capping incoming requests to **10 calls/minute** to protect API credit drain.
- **Input Caps**: Prompts sent to AI endpoints are strictly capped at **500 characters** to prevent token abuse.
- **Serverless Duration Control**: Streaming and generation handlers are configured with `export const maxDuration = 30` to prevent infinite-hanging function execution.
- **Cross-Browser Testing**: Verified layout rendering and WebGL shader stability on Chrome, Firefox, Edge, and Mobile Safari.

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/ABRO-code/portfolio-v3.git](https://github.com/ABRO-code/portfolio-v3.git)
   cd portfolio-v3