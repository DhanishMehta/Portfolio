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

// Targets are biased to the right of each focal object so the object lands on the
// left ~half of the frame, clear of the right-docked content panel (~35% width).
export const CAMERA_POSITIONS: Record<string, CameraState> = {
  hub: { position: [9.6, 5.4, -1], target: [2.65, 1.06, 6.34] },
  projects: { position: [3.61, 2.74, 3.66], target: [0.88, 1.14, 7.85] },
  experience: { position: [2.32, 2.76, 4.9], target: [-0.54, 1.1, 9.23] },
  skills: { position: [5.94, 2.4, 4.21], target: [3.21, 0.8, 8.4] },
  awards: { position: [4.29, 4.12, 5.04], target: [1.31, 2.4, 9.52] },
  arcade: { position: [4.0, 1.55, 6.2], target: [6.26, 1.39, 7.0] },
  chill: { position: [6.97, 1.98, 1.25], target: [4.36, 0.45, 5.3] },
  // Astronaut floats outside the room (three ≈ [-6, 3, 2]); fly out to meet it.
  about: { position: [-1.2, 3.2, 4.6], target: [-6, 3, 2] },
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
  astronaut_main: 'about',
};

export const ZONE_LABELS: Record<ZoneKey, string> = {
  hub: 'Overview',
  projects: 'Projects',
  experience: 'Experience',
  skills: 'AI DNA',
  awards: 'Awards',
  arcade: 'Arcade',
  chill: 'Chill Corner',
  about: 'About Me',
};

export const CAMERA_TWEEN = { duration: 1.1, ease: 'power2.inOut' };

export const MODEL_URL = '/assets/3d/models/workshop.glb';
export const HDRI_URL = '/assets/3d/textures/hdri/space.hdr';
export const DRACO_PATH = '/assets/3d/draco/';
