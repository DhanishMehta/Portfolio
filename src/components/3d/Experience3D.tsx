'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Loader,
  AdaptiveDpr,
} from '@react-three/drei';
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing';
import { World3D } from './World3D';
import { NavigationBanner3D } from './NavigationBanner3D';
import { useCamera3D } from '@/hooks/useCamera3D';
import {
  CAMERA_POSITIONS,
  HDRI_URL,
  HUB_FOV,
  type ZoneKey,
} from './constants3d';

export default function Experience3D() {
  const { cameraRef, controlsRef, flyTo } = useCamera3D();
  const [activeZone, setActiveZone] = useState<ZoneKey>('hub');

  const navigate = (zone: ZoneKey) => {
    setActiveZone(zone);
    flyTo(zone);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#060D1F]">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        shadows
      >
        <color attach="background" args={['#060D1F']} />
        <fog attach="fog" args={['#060D1F', 18, 42]} />

        <PerspectiveCamera
          makeDefault
          ref={cameraRef}
          fov={HUB_FOV}
          position={CAMERA_POSITIONS.hub.position}
        />
        <OrbitControls
          ref={controlsRef}
          target={CAMERA_POSITIONS.hub.target}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={4}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.05}
        />

        {/* Cool rim from "space" + ambient lift; warm pools are baked into the GLB lights' intent. */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[-8, 10, -6]} intensity={0.5} color="#6f8cff" />
        <pointLight position={[3.5, 2, 7]} intensity={8} color="#F5A420" distance={9} />

        <Suspense fallback={null}>
          <World3D onSelectZone={navigate} />
          <Environment files={HDRI_URL} />
        </Suspense>

        <Stars radius={80} depth={50} count={2500} factor={4} saturation={0} fade speed={0.5} />

        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.3} intensity={0.6} mipmapBlur />
          <SMAA />
        </EffectComposer>

        <AdaptiveDpr pixelated />
      </Canvas>

      <NavigationBanner3D active={activeZone} onNavigate={navigate} />
      <Loader />
    </div>
  );
}
