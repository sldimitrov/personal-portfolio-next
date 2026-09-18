'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ),
      });
    }
    particlesRef.current = particles;

    // Create particle geometry
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    particles.forEach((p, i) => {
      particlePositions[i * 3] = p.position.x;
      particlePositions[i * 3 + 1] = p.position.y;
      particlePositions[i * 3 + 2] = p.position.z;
    });

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Create particle material and points
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 1.5,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Create lines geometry
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      opacity: 0.3,
      transparent: true,
      linewidth: 1,
    });

    linesRef.current = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesRef.current);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Update particle positions
      particles.forEach((p) => {
        p.position.add(p.velocity);

        // Bounce off boundaries
        if (Math.abs(p.position.x) > 50) p.velocity.x *= -1;
        if (Math.abs(p.position.y) > 50) p.velocity.y *= -1;
        if (Math.abs(p.position.z) > 50) p.velocity.z *= -1;
      });

      // Update particle positions in geometry
      const positionAttribute = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = positionAttribute.array as Float32Array;

      particles.forEach((p, i) => {
        posArray[i * 3] = p.position.x;
        posArray[i * 3 + 1] = p.position.y;
        posArray[i * 3 + 2] = p.position.z;
      });
      positionAttribute.needsUpdate = true;

      // Draw lines between nearby particles
      if (linesRef.current) {
        const linePositions: number[] = [];
        const connectionDistance = 30;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const distance = particles[i].position.distanceTo(particles[j].position);
            if (distance < connectionDistance) {
              linePositions.push(
                particles[i].position.x,
                particles[i].position.y,
                particles[i].position.z,
                particles[j].position.x,
                particles[j].position.y,
                particles[j].position.z
              );
            }
          }
        }

        linesRef.current.geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(linePositions), 3)
        );
      }

      // Subtle rotation
      particleSystem.rotation.x += 0.0002;
      particleSystem.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-20" />;
}
