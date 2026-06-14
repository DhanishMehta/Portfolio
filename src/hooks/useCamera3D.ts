'use client';

import { useCallback, useRef } from 'react';
import gsap from 'gsap';
import type { PerspectiveCamera } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CAMERA_POSITIONS, CAMERA_TWEEN, type ZoneKey } from '@/components/3d/constants3d';

/**
 * GSAP-driven camera flights between zones, same technique as joan-portfolio's Navigation.js.
 * Tweens both the camera position and the OrbitControls target so the look-at stays smooth.
 */
export function useCamera3D() {
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const flyTo = useCallback((zone: ZoneKey, onComplete?: () => void) => {
    const cam = cameraRef.current;
    const controls = controlsRef.current;
    const dest = CAMERA_POSITIONS[zone];
    if (!cam || !controls || !dest) return;

    tweenRef.current?.kill();
    controls.enabled = false;

    const proxy = {
      px: cam.position.x,
      py: cam.position.y,
      pz: cam.position.z,
      tx: controls.target.x,
      ty: controls.target.y,
      tz: controls.target.z,
    };

    tweenRef.current = gsap.to(proxy, {
      px: dest.position[0],
      py: dest.position[1],
      pz: dest.position[2],
      tx: dest.target[0],
      ty: dest.target[1],
      tz: dest.target[2],
      duration: CAMERA_TWEEN.duration,
      ease: CAMERA_TWEEN.ease,
      onUpdate: () => {
        // Drive the camera directly during flight. Do NOT call controls.update()
        // here — it re-derives position from the orbit sphere and clamps to
        // minDistance, overriding these (often closer) zone framings.
        cam.position.set(proxy.px, proxy.py, proxy.pz);
        cam.lookAt(proxy.tx, proxy.ty, proxy.tz);
      },
      onComplete: () => {
        // Sync controls to the final framing, then re-enable orbit only at the hub.
        controls.target.set(dest.target[0], dest.target[1], dest.target[2]);
        controls.enabled = zone === 'hub';
        if (zone === 'hub') controls.update();
        onComplete?.();
      },
    });
  }, []);

  return { cameraRef, controlsRef, flyTo };
}
