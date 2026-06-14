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
  projects: { position: [2.86, 2.69, 4.31], target: [0.38, 1.22, 8.21] },
  experience: { position: [3.32, 2.42, 3.73], target: [0.84, 0.95, 7.63] },
  skills: { position: [5.09, 2.3, 4.58], target: [2.73, 0.9, 8.34] },
  awards: { position: [4.04, 4.0, 5.3], target: [1.31, 2.4, 9.49] },
  arcade: { position: [1.7, 1.6, 5.7], target: [-1.49, 1.39, 5.7] },
  chill: { position: [5.11, 1.97, 1.66], target: [2.63, 0.5, 5.56] },
  // Astronaut floats outside the room (three ≈ [-6, 3, 2]); fly out to meet it.
  about: { position: [-1.5, 4.2, 4.2], target: [-5.97, 4.53, 2.34] },
};

export type ZoneKey = keyof typeof CAMERA_POSITIONS;

// Maps an interactive mesh's named ancestor (from the GLB scene graph) to a zone.
// Climb an Object3D's parents until one of these names is hit.
export const OBJECT_TO_ZONE: Record<string, ZoneKey> = {
  // Projects = the monitors; Experience = the desk itself (clear, distinct targets).
  monitor_new_L: 'projects',
  monitor_new_2: 'projects',
  Monitor: 'projects',
  desk_modern: 'experience',
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
  rug_round_chill: 'chill',
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
