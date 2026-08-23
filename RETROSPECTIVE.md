
# AI Fluency Track Retrospective — Abdoul-Madjid BAWA  (ABRO)

---

## 1. Letter to My Week 1 Self
When I started Week 1, I viewed AI primarily as a high-speed code generator—a tool to quickly output snippets. Eight weeks later, my perspective has fundamentally shifted. I now approach AI as an architectural thought partner and co-engineer. I set out to build production-grade web applications and algorithmic systems, and throughout this track, I learned that the real skill is not asking AI to write code, but systematically evaluating, constraining, and steering its output to meet strict engineering standards.

---

## 2. What Changed in How I Work
- **From Prompting to Specification**: Instead of asking for generic components, I now supply explicit specs: API constraints, input bounds, rate-limiting rules, and accessibility requirements.
- **Defensive Production Engineering**: I learned that shipping AI features requires proactive defense. Adding input capping (e.g., 500-character caps) and execution timeouts (`maxDuration = 30`) are essential to prevent credit exhaustion and abuse.
- **Verification-First Mindset**: AI generates plausibility, but engineering requires truth. Every shader code block, math equation, and state transition is independently validated before reaching production.

---

## 3. Top 3 Transferable Skills Learned
1. **Iterative Evaluation & Red Teaming**: Testing systems to failure builds far more resilient software than simply building for the happy path.
2. **WebGL & Mathematical Visualization**: Understanding uniforms, UV coordinate normalization, and frame updates in React Three Fiber allows me to craft signature user experiences.
3. **Transparent AI Integration**: Clearly documenting where AI assisted and where human verification occurred builds trust with technical reviewers, clients, and employers.

---

## 4. What I Would Build Next
Moving forward, I plan to scale this platform by integrating a full-stack automated trading dashboard for my swing trading strategies, replacing the in-memory rate limiter with a distributed Upstash Redis instance, and deploying real-time market data visualizers powered by custom shaders.


