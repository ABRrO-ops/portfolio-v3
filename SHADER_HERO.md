# FE-AA3: Signature Shader Hero Report

**Project**: ABRO Personal Portfolio (Next.js Rebuild)  
**Author**: BAWA Abdoul-Madjid (ABRO)  

---

## 1. Shader Source Code & Mental Model Walkthrough

- **UV Normalization**:  
  `vec2 st = gl_FragCoord.xy / u_resolution.xy;`  
  Converts screen pixel space to normalized `[0.0, 1.0]` coordinates for consistent shader scaling across screen resolutions.

- **Dynamic Wave Motion (`u_time`)**:  
  `distortedUv.x += sin(st.y * 8.0 + u_time * 0.4) * 0.04;`  
  Modifies UV coordinates using trigonometric functions scaled by elapsed time to create a fluid, continuous background movement.

- **Interactive Cursor Highlight (`u_mouse`)**:  
  `float mouseGlow = smoothstep(0.45, 0.0, distance(st, mouse));`  
  Calculates the distance from the user's cursor to create a localized radial gradient highlight that moves dynamically with the mouse.

- **Color Mixing & Dithering**:  
  Blends deep slate (`#0F172A`), cyan (`#00F2FE`), and crimson (`#E50914`) tones, supplemented by a subtle pseudo-random noise pass to prevent color banding.

---

## 2. Performance & Accessibility Fallback

- **DPR Capping**:  
  WebGL Canvas is restricted using `dpr={[1, 1.5]}` to prevent frame drops on high-density Retina or 4K screens.
- **Reduced Motion Support**:  
  Detects `prefers-reduced-motion: reduce` via `window.matchMedia`. When active, WebGL rendering is suspended in favor of a static CSS gradient.