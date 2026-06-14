'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import type { Object3D } from 'three';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { MODEL_URL, DRACO_PATH, OBJECT_TO_ZONE, type ZoneKey } from './constants3d';
import { RubiksCube } from './RubiksCube';
import { GameLauncher } from './games/GameLauncher';

useGLTF.preload(MODEL_URL, DRACO_PATH);

/** Climb the parent chain until a named ancestor maps to a zone. */
function resolveZone(obj: Object3D | null): ZoneKey | null {
  let cur: Object3D | null = obj;
  while (cur) {
    const zone = OBJECT_TO_ZONE[cur.name];
    if (zone) return zone;
    cur = cur.parent;
  }
  return null;
}

interface World3DProps {
  activeZone: ZoneKey;
  onSelectZone: (zone: ZoneKey) => void;
}

export function World3D({ activeZone, onSelectZone }: World3DProps) {
  const { scene, animations } = useGLTF(MODEL_URL, DRACO_PATH);
  const { actions } = useAnimations(animations, scene);

  // Loop the robot's pre-baked idle animation (first clip).
  useEffect(() => {
    const first = Object.values(actions)[0];
    first?.reset().play();
  }, [actions]);

  // Astronaut: gentle drift + tumble so it reads as floating in space.
  const astronaut = useMemo(() => scene.getObjectByName('astronaut_main') ?? null, [scene]);
  const baseY = useRef(astronaut?.position.y ?? 0);
  useFrame((state) => {
    if (!astronaut) return;
    const t = state.clock.elapsedTime;
    astronaut.position.y = baseY.current + Math.sin(t * 0.6) * 0.25;
    astronaut.rotation.y += 0.0015;
    astronaut.rotation.z = Math.sin(t * 0.4) * 0.08;
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    if (resolveZone(e.object)) {
      e.stopPropagation();
      document.body.style.cursor = 'pointer';
    }
  };

  const handleOut = () => {
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const zone = resolveZone(e.object);
    if (zone) {
      e.stopPropagation();
      onSelectZone(zone);
    }
  };

  return (
    <group>
      <primitive
        object={scene}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      />

      {/* Rubik's cube — procedural, seated on the desk surface (desk top ≈ y1.0). */}
      <RubiksCube position={[1.15, 1.18, 6.95]} scale={0.16} />

      {/* The arcade game lives ON the cabinet screen. GameScreen_Plane center is at
          three (6.26, 1.39, 7.0); its face normal points -x, so rotate to face -x.
          Only mounted in the arcade zone to keep the game canvas idle otherwise. */}
      {activeZone === 'arcade' && (
        <Html
          transform
          position={[6.18, 1.39, 7.0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.0016}
          distanceFactor={undefined}
          occlude={false}
          zIndexRange={[20, 0]}
          style={{ width: 360, pointerEvents: 'auto' }}
        >
          <div className="rounded-md bg-[#060D1F] p-2 shadow-[0_0_30px_rgba(245,164,32,0.25)]">
            <GameLauncher />
          </div>
        </Html>
      )}
    </group>
  );
}
