import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cylinderVertexShader = `
varying vec2 vUv;
uniform float uScrollSpeed;
uniform float uCurveStrength;
uniform float uCurveFrequency;

void main() {
  vec3 pos = position;
  vUv = uv;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  float xDisplacement = uCurveStrength * cos(worldPosition.y * uCurveFrequency);
  pos.x += xDisplacement;
  pos.x -= uCurveStrength;

  float yDisplacement = -sin(uv.x * 3.141592653589793) * uScrollSpeed;
  pos.y += yDisplacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const cylinderFragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uGrainStrength;
uniform vec3 uOverlayColor;

float random(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;

  if (uPlaneAspect > uImageAspect) {
    uv.y = uv.y * (uImageAspect / uPlaneAspect) + (1.0 - uImageAspect / uPlaneAspect) * 0.5;
  } else {
    uv.x = uv.x * (uPlaneAspect / uImageAspect) + (1.0 - uPlaneAspect / uImageAspect) * 0.5;
  }

  vec4 tex = texture2D(uTexture, uv);
  vec3 grain = vec3(uGrainStrength * (random(uv * vec2(1000.0)) - 0.5));
  vec3 color = mix(tex.rgb, uOverlayColor, 0.2);
  color = clamp(color + grain, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

const imageUrls = Array.from({ length: 15 }, (_, i) =>
  `/images/cylinder-${String(i + 1).padStart(2, '0')}.jpg`
);

export default function MauritiusRoots() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const section = containerRef.current;
    if (!container || !section) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create cylinder of images
    const group = new THREE.Group();
    const radius = 3.2;
    const imageCount = 15;
    const geometry = new THREE.PlaneGeometry(1.2, 1.8, 16, 16);
    const materials: THREE.ShaderMaterial[] = [];
    const meshes: THREE.Mesh[] = [];

    const textureLoader = new THREE.TextureLoader();

    imageUrls.forEach((url, i) => {
      const texture = textureLoader.load(url);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const material = new THREE.ShaderMaterial({
        vertexShader: cylinderVertexShader,
        fragmentShader: cylinderFragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uScrollSpeed: { value: 0 },
          uCurveStrength: { value: 0.3 },
          uCurveFrequency: { value: 0.5 },
          uImageAspect: { value: 3 / 4 },
          uPlaneAspect: { value: 1.2 / 1.8 },
          uGrainStrength: { value: 0.03 },
          uOverlayColor: { value: new THREE.Vector3(0.721, 0.541, 0.211) },
        },
        side: THREE.DoubleSide,
      });
      materials.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      const angle = (i / imageCount) * Math.PI * 2;
      mesh.position.x = Math.sin(angle) * radius;
      mesh.position.y = (i / imageCount) * 6 - 3;
      mesh.position.z = Math.cos(angle) * radius;
      mesh.rotation.y = angle + Math.PI;

      group.add(mesh);
      meshes.push(mesh);
    });

    scene.add(group);

    // Scroll-driven rotation
    let scrollProgress = 0;
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const targetRotation = scrollProgress * Math.PI * 2;
      group.rotation.x += (targetRotation - group.rotation.x) * 0.1;

      // Update individual mesh positions based on rotation
      meshes.forEach((mesh, i) => {
        const baseAngle = (i / imageCount) * Math.PI * 2;
        const angle = baseAngle + group.rotation.x;
        mesh.position.x = Math.sin(angle) * radius;
        mesh.position.z = Math.cos(angle) * radius;
        mesh.rotation.y = angle + Math.PI;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Resize handler
    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      st.kill();
      renderer.dispose();
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      id="histoire"
      ref={containerRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ivory">
        {/* 3D Canvas */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0"
        />

        {/* Overlay Text */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none opacity-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(248,243,232,0.7) 0%, rgba(248,243,232,0.3) 50%, transparent 80%)',
            }}
          />
          <div className="relative text-center px-6">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-charcoal mb-4 leading-none">
              Ancr&eacute;s &agrave; Maurice.
            </h2>
            <p className="font-body text-base md:text-lg text-clay max-w-lg mx-auto">
              Une production locale au c&oelig;ur de l&apos;agriculture mauricienne.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
