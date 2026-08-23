'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution.xy;

    vec2 distortedUv = st;
    distortedUv.x += sin(st.y * 8.0 + u_time * 0.4) * 0.04;
    distortedUv.y += cos(st.x * 8.0 + u_time * 0.4) * 0.04;

    float dist = distance(st, mouse);
    float mouseGlow = smoothstep(0.45, 0.0, dist);

    vec3 bgBase = vec3(0.06, 0.09, 0.16);     
    vec3 brandCyan = vec3(0.0, 0.95, 0.99);    
    vec3 brandCrimson = vec3(0.90, 0.03, 0.08);

    vec3 color = mix(bgBase, brandCrimson * 0.4, distortedUv.x + mouseGlow * 0.3);
    color = mix(color, brandCyan * 0.5, distortedUv.y);

    float grain = (random(st + u_time * 0.01) - 0.5) * 0.025;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }),
    [size]
  );

  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.u_time.value = state.clock.getElapsedTime();
      mat.uniforms.u_mouse.value.set(
        state.mouse.x * (size.width / 2) + size.width / 2,
        state.mouse.y * (size.height / 2) + size.height / 2
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function SignatureHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0F172A] text-white">
      {/* Background Canvas GLSL */}
      <div className="absolute inset-0 z-0">
        {!isMounted || reducedMotion ? (
          <div className="h-full w-full bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#00F2FE]/20" />
        ) : (
          <Canvas
            dpr={[1, 1.5]}
            gl={{ powerPreference: 'high-performance', antialias: false }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <ShaderPlane />
          </Canvas>
        )}
      </div>

      {/* Hero Content Superposé au centre */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-widest text-cyan-400 uppercase backdrop-blur-md">
          Frontend & AI Engineering
        </span>
        
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
          BAWA Abdoul-Madjid <span className="text-[#00F2FE]">(ABRO)</span>
        </h1>
        
        <p className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
          Crafting high-performance web systems, AI workflows, and algorithmic solutions.
        </p>

        <div className="mt-8 flex gap-4">
          <a href="#projects">
            <button className="px-6 py-3 rounded-xl bg-[#00F2FE] text-slate-950 font-bold hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                 Voir les Projets
            </button>
        </a>
        </div>
      </div>
    </div>
  );
}