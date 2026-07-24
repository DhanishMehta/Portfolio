'use client';

import { useMemo, type ReactNode } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '@/data/projects.data';
import { EXPERIENCE } from '@/data/experience.data';
import { DeployDash } from './games/DeployDash';

/**
 * Diegetic UI glued flat onto the room's screens via drei <Html transform>.
 * Position + orientation are read from each screen mesh's actual runtime world
 * transform (so it sits in-place on the glass, not as a floating billboard):
 *   - Monitor.001 (viewer-left)  -> Experience
 *   - Monitor     (viewer-right) -> Projects
 *   - GameScreen_Plane           -> playable arcade game
 * In CSS3D transform mode 1px = 1 world unit, so scale = screenMeters / panelPx.
 */

// roughly the room interior / viewer side — used to flip face normals outward
const FRONT = new THREE.Vector3(9.6, 5.4, -1);

/**
 * World-space outward normal AND centroid of a mesh node's two largest coplanar faces
 * (the screen quad). Using the quad centroid — not the whole-object bbox center — keeps
 * the panel on the glass instead of drifting down into the monitor stand.
 */
function screenFace(mesh: THREE.Mesh): { normal: THREE.Vector3; center: THREE.Vector3 } {
  const geo = mesh.geometry;
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const idx = geo.index;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const n = new THREE.Vector3();
  const best = new THREE.Vector3(0, 0, 1);
  const bestCentroidLocal = new THREE.Vector3();
  let bestArea = -1;
  const tris = idx ? idx.count / 3 : pos.count / 3;
  for (let t = 0; t < tris; t++) {
    const i0 = idx ? idx.getX(t * 3) : t * 3;
    const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
    a.fromBufferAttribute(pos, i0);
    b.fromBufferAttribute(pos, i1);
    c.fromBufferAttribute(pos, i2);
    ab.subVectors(b, a);
    ac.subVectors(c, a);
    n.crossVectors(ab, ac);
    const area = n.length();
    if (area > bestArea) {
      bestArea = area;
      best.copy(n).normalize();
      bestCentroidLocal.copy(a).add(b).add(c).divideScalar(3);
    }
  }
  const center = bestCentroidLocal.applyMatrix4(mesh.matrixWorld);
  const nm = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
  const normal = best.applyMatrix3(nm).normalize();
  if (normal.dot(FRONT.clone().sub(center)) < 0) normal.negate();
  return { normal, center };
}

interface SurfaceProps {
  scene: THREE.Object3D;
  node: string;
  worldWidth: number;
  pxWidth: number;
  interactive?: boolean;
  children: ReactNode;
}

function Surface({ scene, node, worldWidth, pxWidth, interactive, children }: SurfaceProps) {
  const placement = useMemo<{
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  } | null>(() => {
    try {
      const obj = scene.getObjectByName(node);
      if (!obj) return null;
      obj.updateWorldMatrix(true, false);
      let mesh: THREE.Mesh | undefined;
      obj.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!mesh && m.isMesh) mesh = m;
      });
      if (!mesh) return null;

      const { normal, center } = screenFace(mesh);

      // upright basis: panel local +Z faces the viewer, +Y is world-up
      const up = new THREE.Vector3(0, 1, 0);
      const x = new THREE.Vector3().crossVectors(up, normal).normalize();
      const y = new THREE.Vector3().crossVectors(normal, x).normalize();
      const basis = new THREE.Matrix4().makeBasis(x, y, normal);
      const rot = new THREE.Euler().setFromRotationMatrix(basis);

      const p = center.add(normal.clone().multiplyScalar(0.03)); // just off the glass
      return {
        position: [p.x, p.y, p.z],
        rotation: [rot.x, rot.y, rot.z],
        // drei <Html transform> isn't 1px=1unit; this factor maps panelPx -> meters
        scale: (worldWidth / pxWidth) * 42,
      };
    } catch (err) {
      console.error('[Screens3D] placement failed for', node, err);
      return null;
    }
  }, [scene, node, worldWidth, pxWidth]);

  if (!placement) return null;

  return (
    <Html
      transform
      position={placement.position}
      rotation={placement.rotation}
      scale={placement.scale}
      occlude="blending"
      style={{ width: `${pxWidth}px`, pointerEvents: interactive ? 'auto' : 'none' }}
    >
      {children}
    </Html>
  );
}

export function Screens3D({ scene }: { scene: THREE.Object3D }) {
  return (
    <>
      {/* viewer-LEFT monitor — Experience */}
      <Surface scene={scene} node="Monitor.001" worldWidth={0.92} pxWidth={340}>
        <ExperienceScreen />
      </Surface>

      {/* viewer-RIGHT monitor — Projects */}
      <Surface scene={scene} node="Monitor" worldWidth={0.92} pxWidth={340}>
        <ProjectsScreen />
      </Surface>

      {/* arcade cabinet screen — playable game */}
      <Surface scene={scene} node="GameScreen_Plane" worldWidth={0.5} pxWidth={360} interactive>
        <ArcadeScreen />
      </Surface>
    </>
  );
}

/* ---------- screen panels (compact, tuned for the monitor/cabinet faces) ---------- */

function ScreenShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="h-[200px] w-full select-none overflow-hidden rounded-[4px] border border-white/10 bg-[#0b1020] p-3 font-sans text-text-primary shadow-inner">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-accent">{label}</p>
      <div className="space-y-2 overflow-hidden">{children}</div>
    </div>
  );
}

function ProjectsScreen() {
  return (
    <ScreenShell label="~/projects">
      {PROJECTS.slice(0, 4).map((p) => (
        <div key={p.slug} className="rounded border border-white/5 bg-white/[0.03] px-2.5 py-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-semibold text-text-primary">{p.title}</span>
            <span className="font-mono text-[8px] text-text-secondary">{p.number}</span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-[10px] text-text-secondary">{p.shortDescription}</p>
        </div>
      ))}
    </ScreenShell>
  );
}

function ExperienceScreen() {
  return (
    <ScreenShell label="~/experience">
      {EXPERIENCE.slice(0, 4).map((e, i) => (
        <div key={`${e.company}-${e.role}-${i}`} className="border-l border-white/10 pl-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[12px] font-semibold text-text-primary">{e.company}</span>
            <span className="font-mono text-[8px] text-text-secondary whitespace-nowrap">{e.duration}</span>
          </div>
          <p className="text-[10px] text-accent/90">{e.role}</p>
        </div>
      ))}
    </ScreenShell>
  );
}

function ArcadeScreen() {
  return (
    <div className="w-full overflow-hidden rounded-[4px] border-2 border-black bg-black p-1 shadow-inner">
      <DeployDash />
    </div>
  );
}
