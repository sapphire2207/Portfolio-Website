"use client";

import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

export function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.8, 9], fov: 34, near: 0.1, far: 40 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 6, 4]} intensity={1.05} castShadow />
          <ComputerScene />
          <ContactShadows
            position={[0, -2.3, 0]}
            opacity={0.55}
            scale={22}
            blur={1.6}
            far={8}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ComputerScene() {
  const materials = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({
        color: 0x15182a,
        roughness: 0.26,
        metalness: 0.6,
      }),
      bezel: new THREE.MeshStandardMaterial({
        color: 0x0c0f1c,
        roughness: 0.35,
        metalness: 0.5,
      }),
      stand: new THREE.MeshStandardMaterial({
        color: 0x262a40,
        roughness: 0.28,
        metalness: 0.58,
      }),
      websiteBg: new THREE.MeshStandardMaterial({
        color: 0x121a34,
        emissive: 0x121a34,
        emissiveIntensity: 0.42,
      }),
      websiteCard: new THREE.MeshStandardMaterial({
        color: 0x7f8cff,
        emissive: 0x5466ff,
        emissiveIntensity: 0.36,
      }),
      websiteAccent: new THREE.MeshStandardMaterial({
        color: 0x34d8ff,
        emissive: 0x1fb7ff,
        emissiveIntensity: 0.28,
      }),
      terminalBg: new THREE.MeshStandardMaterial({
        color: 0x101218,
        emissive: 0x101218,
        emissiveIntensity: 0.52,
      }),
      terminalText: new THREE.MeshStandardMaterial({
        color: 0x8cffb2,
        emissive: 0x42e57f,
        emissiveIntensity: 0.38,
      }),
      trafficRed: new THREE.MeshStandardMaterial({ color: 0xff5f56 }),
      trafficYellow: new THREE.MeshStandardMaterial({ color: 0xffbd2e }),
      trafficGreen: new THREE.MeshStandardMaterial({ color: 0x27c93f }),
    }),
    [],
  );

  return (
    <Float speed={1.35} rotationIntensity={0.24} floatIntensity={0.22}>
      <group position={[0, 0.05, 0]} rotation={[-0.05, -0.4, 0.02]}>
        <mesh material={materials.stand} position={[0, -1.6, -0.45]} castShadow>
          <boxGeometry args={[0.5, 1.2, 0.25]} />
        </mesh>
        <mesh material={materials.stand} position={[0, -2.15, 0]} castShadow>
          <boxGeometry args={[2.7, 0.22, 1.4]} />
        </mesh>

        <mesh material={materials.shell} position={[0, 0, 0.03]} castShadow>
          <boxGeometry args={[5.6, 3.55, 0.32]} />
        </mesh>
        <mesh material={materials.bezel} position={[0, 0, 0.23]}>
          <boxGeometry args={[5.25, 3.2, 0.05]} />
        </mesh>

        <group position={[0, 0, 0.28]}>
          <mesh material={materials.websiteBg} position={[0, 0, 0]}>
            <planeGeometry args={[5.05, 3.02]} />
          </mesh>

          <mesh material={materials.websiteCard} position={[0, 0.95, 0.01]}>
            <planeGeometry args={[4.55, 0.52]} />
          </mesh>
          <mesh material={materials.websiteAccent} position={[-1.45, 0.23, 0.01]}>
            <planeGeometry args={[1.25, 1.22]} />
          </mesh>
          <mesh material={materials.websiteCard} position={[0.6, 0.35, 0.01]}>
            <planeGeometry args={[2.9, 0.4]} />
          </mesh>
          <mesh material={materials.websiteCard} position={[0.55, -0.16, 0.01]}>
            <planeGeometry args={[2.9, 0.4]} />
          </mesh>
          <mesh material={materials.websiteAccent} position={[0.55, -0.67, 0.01]}>
            <planeGeometry args={[2.9, 0.4]} />
          </mesh>
        </group>

        <group position={[1.35, -0.9, 0.62]} rotation={[0.08, -0.18, -0.02]}>
          <mesh material={materials.terminalBg} castShadow>
            <boxGeometry args={[2.45, 1.55, 0.12]} />
          </mesh>
          <mesh material={materials.trafficRed} position={[-0.95, 0.58, 0.07]}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
          <mesh material={materials.trafficYellow} position={[-0.74, 0.58, 0.07]}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
          <mesh material={materials.trafficGreen} position={[-0.53, 0.58, 0.07]}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>

          <TerminalActivity material={materials.terminalText} />
        </group>
      </group>
    </Float>
  );
}

type TerminalActivityProps = {
  material: THREE.Material;
};

function TerminalActivity({ material }: TerminalActivityProps) {
  const lineRefs = useRef<Array<THREE.Mesh | null>>([]);
  const cursorRef = useRef<THREE.Mesh | null>(null);
  const baseWidths = useMemo(() => [1.7, 1.45, 1.95, 1.3], []);
  const yPositions = useMemo(() => [0.22, -0.04, -0.3, -0.56], []);
  const leftX = -1.02;
  const commandDuration = 1.35;
  const holdDuration = 0.45;
  const cycleDuration = commandDuration + holdDuration;

  useFrame(({ clock }) => {
    const total = clock.getElapsedTime();
    const lineIndex = Math.floor(total / cycleDuration) % baseWidths.length;
    const phase = total % cycleDuration;
    const progress = Math.min(phase / commandDuration, 1);

    for (let i = 0; i < lineRefs.current.length; i += 1) {
      const line = lineRefs.current[i];
      if (!line) continue;

      const isActive = i === lineIndex;
      const isPast = i < lineIndex;
      const widthProgress = isPast ? 1 : isActive ? progress : 0.04;
      const width = baseWidths[i] * widthProgress;

      line.scale.x = Math.max(widthProgress, 0.04);
      line.position.x = leftX + width / 2;
      line.visible = i <= lineIndex;
    }

    if (cursorRef.current) {
      const currentWidth = baseWidths[lineIndex] * Math.max(progress, 0.04);
      cursorRef.current.position.x = leftX + currentWidth + 0.06;
      cursorRef.current.position.y = yPositions[lineIndex];
      cursorRef.current.visible = Math.sin(total * 9.0) > -0.2;
    }
  });

  return (
    <>
      {baseWidths.map((width, index) => (
        <mesh
          key={index}
          ref={(element) => {
            lineRefs.current[index] = element;
          }}
          material={material}
          position={[leftX + width / 2, yPositions[index], 0.07]}
        >
          <planeGeometry args={[width, 0.08]} />
        </mesh>
      ))}
      <mesh ref={cursorRef} material={material} position={[leftX, yPositions[0], 0.07]}>
        <planeGeometry args={[0.05, 0.095]} />
      </mesh>
    </>
  );
}
