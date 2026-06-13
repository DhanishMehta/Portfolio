'use client';

import { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import type { Object3D } from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import { MODEL_URL, DRACO_PATH, OBJECT_TO_ZONE, type ZoneKey } from './constants3d';
import { RubiksCube } from './RubiksCube';

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
  onSelectZone: (zone: ZoneKey) => void;
}

export function World3D({ onSelectZone }: World3DProps) {
  const { scene, animations } = useGLTF(MODEL_URL, DRACO_PATH);
  const { actions } = useAnimations(animations, scene);

  // Loop the robot's pre-baked idle animation (first clip).
  useEffect(() => {
    const first = Object.values(actions)[0];
    first?.reset().play();
  }, [actions]);

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
      {/* Rubik's cube is intentionally NOT in the GLB — built procedurally. */}
      <RubiksCube position={[1.3, 0.95, 6.6]} scale={0.18} />
    </group>
  );
}
