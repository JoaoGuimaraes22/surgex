"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./theme-provider";

export default function BackgroundSphere({
  includeTorus = false,
}: {
  includeTorus?: boolean;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const isDark = theme === "dark";
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Torus knot — only on hero
    let torusKnot: THREE.Mesh | null = null;
    let torusKnotMat: THREE.MeshBasicMaterial | null = null;
    if (includeTorus) {
      torusKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(10, 3, 100, 16),
        new THREE.MeshBasicMaterial({
          color: isDark ? 0xffffff : 0x000000,
          wireframe: true,
          transparent: true,
          opacity: 0.07,
        })
      );
      torusKnotMat = torusKnot.material as THREE.MeshBasicMaterial;
      scene.add(torusKnot);
    }

    // Sphere — always present
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(15, 32, 32),
      new THREE.MeshBasicMaterial({
        color: isDark ? 0x444444 : 0xbbbbbb,
        wireframe: true,
        transparent: true,
        opacity: isMobile ? 0.08 : 0.05,
      })
    );
    scene.add(sphere);

    camera.position.z = 30;

    // Mouse-reactive rotation
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Scroll-reactive opacity (torus only)
    let scrollProgress = 0;
    const onScroll = () => {
      scrollProgress = Math.min(window.scrollY / window.innerHeight, 1);
    };
    if (includeTorus) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (torusKnot && torusKnotMat) {
        torusKnot.rotation.x += 0.001;
        torusKnot.rotation.y += 0.002;
        const baseOpacity = 0.07;
        torusKnotMat.opacity = baseOpacity * (1 - scrollProgress);
      }

      sphere.rotation.y -= 0.0005;

      if (isMobile) {
        scene.rotation.y += 0.002;
        scene.rotation.x += 0.0005;
      } else {
        scene.rotation.y += (mouseX - scene.rotation.y) * 0.05;
        scene.rotation.x += (mouseY - scene.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (includeTorus) {
        window.removeEventListener("scroll", onScroll);
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [theme, includeTorus]);

  return (
    <div ref={canvasRef} className="pointer-events-none fixed inset-0 z-[2]" />
  );
}
