'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Loader,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { World3D } from './World3D';
import { NavigationBanner3D } from './NavigationBanner3D';
import { ZoneContent } from './ZoneContent';
import { HudExtras } from './HudExtras';
import { AmbientParticles } from './effects/AmbientParticles';
import { CoffeeSteam } from './effects/CoffeeSteam';
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
        dpr={[1, 1.75]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.AgXToneMapping,
          toneMappingExposure: 0.85,
        }}
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
          {/* environmentIntensity tames the bright HDRI so warm point lights read */}
          <Environment files={HDRI_URL} environmentIntensity={0.35} />
          <CoffeeSteam />
        </Suspense>

        <AmbientParticles />
        <Stars radius={80} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />

        {/* multisampling handles AA in one pass (cheaper than a separate SMAA pass) */}
        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={0.75} luminanceSmoothing={0.3} intensity={0.5} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <NavigationBanner3D active={activeZone} onNavigate={navigate} />
      <ZoneContent zone={activeZone} />
      <HudExtras />
      <Loader />
    </div>
  );
}
