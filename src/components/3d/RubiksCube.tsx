'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

// Standard Rubik's face colors keyed by outward direction.
const FACE_COLORS = {
  px: '#b71234', // right  - red
  nx: '#ff5800', // left   - orange
  py: '#ffffff', // up     - white
  ny: '#ffd500', // down   - yellow
  pz: '#009b48', // front  - green
  nz: '#0046ad', // back   - blue
};
const PLASTIC = '#0a0a0a';

/**
 * Procedural 3x3x3 Rubik's cube — 27 cubies, each a box with per-face colors.
 * Phase-1 stub: a gentle idle spin so it reads as an interactive desk toy.
 * The full drag-to-rotate / scramble mechanic lands in Phase 5 (see plan).
 */
export function RubiksCube({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<Group>(null);

  const cubies = useMemo(() => {
    const items: { key: string; pos: [number, number, number]; colors: string[] }[] = [];
    const gap = 1.04;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Material order: +x, -x, +y, -y, +z, -z. Inner faces stay black plastic.
          const colors = [
            x === 1 ? FACE_COLORS.px : PLASTIC,
            x === -1 ? FACE_COLORS.nx : PLASTIC,
            y === 1 ? FACE_COLORS.py : PLASTIC,
            y === -1 ? FACE_COLORS.ny : PLASTIC,
            z === 1 ? FACE_COLORS.pz : PLASTIC,
            z === -1 ? FACE_COLORS.nz : PLASTIC,
          ];
          items.push({ key: `${x}${y}${z}`, pos: [x * gap, y * gap, z * gap], colors });
        }
      }
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={groupRef} position={position} scale={scale} name="deco_rubiks">
      {cubies.map((c) => (
        <mesh key={c.key} position={c.pos}>
          <boxGeometry args={[1, 1, 1]} />
          {c.colors.map((color, i) => (
            <meshStandardMaterial key={i} attach={`material-${i}`} color={color} roughness={0.4} />
          ))}
        </mesh>
      ))}
    </group>
  );
}
