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

  // Escape deselects the current item and returns to the hub overview.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('hub');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

        {/* Cozy warm room: soft warm ambient + warm key, two warm pools (desk + chill), cool rim. */}
        <ambientLight intensity={0.7} color="#fff1df" />
        <directionalLight position={[-5, 9, -3]} intensity={0.75} color="#ffd9a8" />
        <pointLight position={[1.0, 3.0, 7.0]} intensity={6} color="#ffba6e" distance={9} />
        <pointLight position={[2.4, 2.4, 5.0]} intensity={4.5} color="#ffc77d" distance={7} />
        <directionalLight position={[6, 6, 2]} intensity={0.3} color="#9fb6ff" />

        <Suspense fallback={null}>
          <World3D activeZone={activeZone} onSelectZone={navigate} />
          {/* environmentIntensity tames the bright HDRI so warm point lights read */}
          <Environment files={HDRI_URL} environmentIntensity={0.35} />
          <CoffeeSteam />
        </Suspense>

        <AmbientParticles />
        <Stars radius={80} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />

        {/* multisampling handles AA in one pass (cheaper than a separate SMAA pass) */}
        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.3} intensity={0.4} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <NavigationBanner3D active={activeZone} onNavigate={navigate} />
      <ZoneContent zone={activeZone} />
      <HudExtras />
      <Loader />
    </div>
  );
}
