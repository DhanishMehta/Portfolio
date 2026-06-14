'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { Vector3, type Object3D } from 'three';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { MODEL_URL, DRACO_PATH, OBJECT_TO_ZONE, ZONE_LABELS, type ZoneKey } from './constants3d';
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

  // Hover tooltip so each interactive object clearly announces its zone.
  const [hover, setHover] = useState<{ zone: ZoneKey; point: Vector3 } | null>(null);

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    const zone = resolveZone(e.object);
    if (zone) {
      e.stopPropagation();
      document.body.style.cursor = 'pointer';
      setHover({ zone, point: e.point.clone() });
    }
  };

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    const zone = resolveZone(e.object);
    if (zone) setHover({ zone, point: e.point.clone() });
  };

  const handleOut = () => {
    document.body.style.cursor = 'auto';
    setHover(null);
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
        onPointerMove={handleMove}
        onPointerOut={handleOut}
        onClick={handleClick}
      />

      {/* Rubik's cube — procedural, resting on the ottoman / coffee table in the chill corner. */}
      <RubiksCube position={[4.55, 0.5, 4.45]} scale={0.085} />

      {/* Hover tooltip — names the zone under the cursor (Projects vs Experience, etc.). */}
      {hover && activeZone === 'hub' && (
        <Html
          position={[hover.point.x, hover.point.y + 0.35, hover.point.z]}
          center
          distanceFactor={9}
          zIndexRange={[15, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div className="whitespace-nowrap rounded-full bg-bg-base/90 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent border border-accent/40 backdrop-blur-sm">
            {ZONE_LABELS[hover.zone]}
          </div>
        </Html>
      )}
    </group>
  );
}
