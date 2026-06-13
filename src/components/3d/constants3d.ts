// All camera positions/targets are in THREE.js (Y-up) world space.
// The GLB was exported from Blender with +Y up, so Blender (x,y,z) -> three (x, z, -y).
// HUB is baked 1:1 from the Blender `Camera` object (the diorama framing in the changelog).
// Other zones are sensible starting offsets toward each interactive object — tune live with leva.

export type Vec3 = [number, number, number];

export interface CameraState {
  position: Vec3;
  target: Vec3;
}

export const HUB_FOV = 32;

export const CAMERA_POSITIONS: Record<string, CameraState> = {
  hub: { position: [9.6, 5.4, -1], target: [2.65, 1.06, 6.34] },
  projects: { position: [4.5, 2.6, 4.4], target: [0.5, 1.62, 7.05] },
  experience: { position: [3.6, 2.6, 5.6], target: [-0.9, 1.2, 8.6] },
  skills: { position: [6.2, 2.6, 5.0], target: [2.8, 1.2, 7.5] },
  awards: { position: [4.6, 3.4, 5.6], target: [0.95, 2.62, 8.92] },
  arcade: { position: [6.6, 2.4, 4.6], target: [3.56, 1.3, 7.0] },
  chill: { position: [7.6, 2.4, 2.2], target: [4.5, 0.7, 4.4] },
};

export type ZoneKey = keyof typeof CAMERA_POSITIONS;

// Maps an interactive mesh's named ancestor (from the GLB scene graph) to a zone.
// Climb an Object3D's parents until one of these names is hit.
export const OBJECT_TO_ZONE: Record<string, ZoneKey> = {
  monitors_group: 'projects',
  bookshelf_main: 'experience',
  robot_skills: 'skills',
  award_shelf: 'awards',
  trophy_01: 'awards',
  trophy_dup_2: 'awards',
  trophy_dup_3: 'awards',
  arcade_cabinet: 'arcade',
  deco_coffee_table: 'chill',
  deco_beanbag: 'chill',
  deco_cards: 'chill',
  deco_headphones_new: 'chill',
};

export const ZONE_LABELS: Record<ZoneKey, string> = {
  hub: 'Overview',
  projects: 'Projects',
  experience: 'Experience',
  skills: 'AI DNA',
  awards: 'Awards',
  arcade: 'Arcade',
  chill: 'Chill Corner',
};

export const CAMERA_TWEEN = { duration: 1.1, ease: 'power2.inOut' };

export const MODEL_URL = '/assets/3d/models/workshop.glb';
export const HDRI_URL = '/assets/3d/textures/hdri/space.hdr';
export const DRACO_PATH = '/assets/3d/draco/';
