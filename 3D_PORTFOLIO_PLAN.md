# 3D Portfolio — Implementation Plan

> Companion to `PORTFOLIO_PLAN.md`. This covers the 3D toggle-able version of the portfolio, accessible via `/3d`. Inspired by [joan-portfolio](https://github.com/jrefusta/joan-portfolio) in approach — a composed Blender scene with real 3D objects — but a completely different world, aesthetic, and identity.

**Updated vision (June 2026):** Real GLB models sourced from the internet, composed in Blender into a floating space environment. NOT procedural geometry for the main scene. React Three Fiber for rendering inside the existing Next.js app.

---

## ✅ Approved Asset Manifest (Final)

All models approved by Dhanish, June 2026. Download these before starting Blender composition.

| # | Object | Model | Source URL | License | Notes |
|---|---|---|---|---|---|
| 1 | Desk | Desk by Quaternius | https://poly.pizza/m/V86Go2rlnq | CC0 | Central hub |
| 2 | Dual Monitors | Dual Monitors by involuntary tsetse | https://poly.pizza/m/c9fdvmLhrsT | CC-BY 3.0 | Both screens on one model |
| 3 | Bookshelf | Bookcase with Books by Quaternius | https://poly.pizza/m/tACDGJ4CGW | CC0 | Optional — skip if scene feels crowded |
| 4 | Arcade Cabinet | Arcade Machine by J-Toastie | https://poly.pizza/m/GLDkMhiynM | CC-BY 3.0 | 2022 model |
| 5 | Chair | Office Chair by Quaternius | https://poly.pizza/m/UfKvrZBK6C | CC0 | Matches desk style |
| 6 | Trophy | Custom trophy | https://poly.pizza/m/pERMCX2UwA | Check on download | 2–3 instances for awards shelf |
| 7 | Server Rack | ~~skipped~~ | — | — | Skills zone uses Robot instead |
| 8 | Robot (animated) | Animated Robot by Quaternius | https://poly.pizza/m/QCm7qe9uNJ | CC0 | Skills zone mascot, pre-baked idle anim |
| 9 | Coffee Mug | Coffee Cup by Poly by Google | https://poly.pizza/m/fIuM_PW5prV | CC-BY 3.0 | Desk — add steam shader |
| 10a | Planets | Planets by Poly by Google | https://poly.pizza/m/3_tN7i962hZ | CC-BY 3.0 | Far background, pick 2–3 |
| 10b | Asteroids | Asteroids by Jarlan Perez | https://poly.pizza/m/9k18F9bT43N | CC-BY 3.0 | Floating foreground rocks |
| 11a | Plant | Houseplant by Quaternius | https://poly.pizza/m/bfLOqIV5uP | CC0 | |
| 11b | Plant | Potted plant by scaranto | https://poly.pizza/m/auhzQHajHd | CC0 | |
| 11c | Plant | Additional plant | https://poly.pizza/m/2ag6_uuqsnb | Check on download | |
| 12 | Book Stack | Book Stack by Danni Bittman | https://poly.pizza/m/1WggoIFq8tx | CC-BY 3.0 | Desk prop |
| 13a | Playing Cards | Card magic deck | https://poly.pizza/m/phCQtmbSy5 | Check on download | Personal hobby — fanned on chill table |
| 13b | Spade Badge | Spade icon | https://poly.pizza/m/6NStaFyk5Rw | Check on download | Decorative badge / card magic accent |
| 14 | Headphones | Red colorway | https://poly.pizza/m/0chwm1mLpRC | Check on download | Desk or arcade area prop |
| 15 | Bean Bag | Bean bag chair | https://poly.pizza/m/nMZz79A5ru | Check on download | Chill corner near arcade |
| 16 | Coffee Table | Low table | https://poly.pizza/m/wJ7pkOloBQ | Check on download | Chill corner — cards + mug on top |
| 17 | Rubik's Cube | Rubik's cube by Poly by Google | https://poly.pizza/m/fOzaoeVGlG9 | CC-BY 3.0 | Static GLB for Blender scene; interactive version built procedurally in R3F |
| 18 | Astronaut | Astronaut (user pick) | https://poly.pizza/m/dLHpzNdygsg | Check on download | Floats 20–25 units outside the room; slow drift + tumble animation in R3F; clickable → speech bubble contact card |
| 19 | Table Lamp | Table lamp | https://poly.pizza/m/uJDWrSJGVH | Check on download | Desk prop — warm amber point light placed at lamp position in R3F |
| 20 | Mouse | Computer mouse | https://poly.pizza/m/6ikB7PIRVyd | Check on download | Desk prop next to keyboard |
| 21 | Keyboard | Keyboard | https://poly.pizza/m/fOy2zvPJAj- | Check on download | Desk prop in front of monitors |
| 22 | Picture Frame | Picture frame | https://poly.pizza/m/ae-21UkVxCg | Check on download | Desk prop — personal photo or easter egg image inside frame |
| 23+ | Anime props | ~~skipped for now~~ | — | — | Can add later — safe picks: katana CC0, lucky cat CC-BY, bonsai CC-BY |

> **Attribution note:** CC-BY 3.0/4.0 models require credit. Add a "Credits" page or collapsible section in the 3D scene's HUD listing all model authors.

### Skills Zone — Robot as Anchor

No server rack. The **Quaternius Animated Robot** is the Skills zone focal point. Click it → camera zooms in → AI stack list and practice tiles appear as floating `<Html>` panels orbiting it. Supplement:
- Tech stack SVG icons as `<Html>` sprites floating around the robot
- Amber particle stream flowing upward (data flow effect)
- Robot's pre-baked idle animation loops continuously

### Chill Corner — Cards, Bean Bag, Headphones

The bean bag + coffee table + playing cards + headphones form a dedicated **chill corner** near the arcade cabinet — distinct from the work desk. This area communicates personality beyond the CV. Layout:
- Bean bag facing the arcade cabinet (you sit there to play)
- Coffee table in between — coffee mug rests on it, cards fanned out on the surface
- Headphones on a hook near the arcade or draped on the bean bag
- The spade badge / card magic motif adds a "magician" easter-egg layer
- Contact/social zone could live in this area too (casual vibe fits)

---

## Stack

```
@react-three/fiber          R3F — Three.js with React declarativity
@react-three/drei           Helpers: useGLTF, Html, Text, Stars, Float, etc.
@react-three/postprocessing Bloom, Outline, SMAA, ChromaticAberration
three                       Core WebGL engine
gsap                        Camera tweens — same technique as joan-portfolio
@types/three                TypeScript support
leva                        Dev-time scene tuning (strip before prod)
```

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap
npm install --save-dev @types/three leva
```

---

## Toggle Mechanism

- **"3D"** button in existing `Navbar.tsx` navigates to `/3d`
- `/3d` is full-screen canvas; existing navbar is hidden inside
- Lightweight HUD overlay: zone navigation links + "Exit 3D" → returns to `/`
- Canvas dynamically imported with `ssr: false` — Three.js requires browser APIs

```tsx
// src/app/3d/page.tsx
const Experience3D = dynamic(() => import('@/components/3d/Experience3D'), { ssr: false });
```

---

## Creative Concept: "The Cosmos Workshop"

**A room floating in space.**

Not a cozy bedroom like Joan's — a **developer's workspace suspended in the cosmos**. Dark void, stars, nebula glows in amber and deep blue. Inside this floating station: a desk, monitors, bookshelves, an arcade cabinet, a trophy wall, tech gear. The "room" is the hub. You navigate by clicking objects in it. Camera glides to each one.

This bridges both goals: the tactile realness of a room environment AND the cosmic/AI-first aesthetic of the existing brand.

**Visual language:**
- Background: procedural star field + subtle nebula (deep navy `#060D1F` → purple haze at edges)
- Lighting: warm amber point lights inside the room, cool blue rim from "space"
- Materials: PBR with HDRI environment map — no baking required initially
- Accent: amber glow (`#F5A420`) on interactive objects (OutlinePass on hover)
- Atmosphere: subtle fog inside the room, bloom on light sources

---

## Rendering Approach: Realtime PBR + HDRI (not baked)

Joan used baked textures in Blender — fast at runtime but requires significant Blender expertise and is rigid once exported.

For this project: **realtime PBR + HDRI environment map**.

- Models use `MeshStandardMaterial` — physically accurate lighting
- A dark space HDRI (from Polyhaven) handles ambient and reflection lighting
- Point lights / spot lights placed in Blender or in R3F code for local warmth
- Bloom post-processing adds the glow to emissive elements
- Easier to iterate — swap models, adjust lights without re-baking

**When to bake:** If performance becomes an issue after scene is fully assembled, bake static background elements in Blender and switch them to `MeshBasicMaterial`. Keep interactive objects on realtime materials.

---

## 3D Model Sourcing Guide

### Where to Find Free Models

| Source | License | Quality | Notes |
|---|---|---|---|
| **poly.pizza** | CC0 / Free | Low-poly, stylized | Best for consistent style, huge library |
| **Polyhaven** | CC0 | High quality | Also has HDRI maps and textures |
| **Quaternius** | CC0 | Low-poly packs | Consistent art style within each pack |
| **Kenney.nl** | CC0 | Game assets | Great for tech/office objects |
| **Sketchfab** | Mixed | Variable | Filter by "free" + "commercial use OK" |
| **CGTrader** | Mixed | High quality | Has free section |
| **Fab.com** | Mixed | High quality | Epic's marketplace, some free |

### Models to Hunt For

| Object | Purpose in Scene | Search Terms |
|---|---|---|
| Desk / workstation | Central hub | "low poly desk", "office desk glb" |
| Dual monitors | Projects zone — screens embed React content | "monitor setup", "dual screen low poly" |
| Bookshelf | Experience/timeline zone | "bookshelf low poly", "bookcase glb" |
| Arcade cabinet | Arcade zone | "arcade machine", "retro arcade glb" |
| Gaming chair | Hero zone / desk | "gaming chair", "office chair 3d" |
| Trophy / award | Awards zone | "trophy 3d", "award cup glb" |
| Server rack | AI/skills zone | "server rack low poly", "data center" |
| Robot / AI figure | Skills zone mascot | "robot low poly", "sci-fi robot glb" |
| Coffee mug | Desk prop — steam effect like Joan's | "coffee mug 3d" |
| Circuit board / chip | Tech prop | "circuit board 3d", "microchip" |
| Floating planet/asteroid | Background env | "low poly planet", "asteroid glb" |
| Social media icons | Contact zone | "github logo 3d", "linkedin 3d" (or model these manually) |
| Plant | Desk prop, warmth | "plant pot low poly" |
| Books (stacked) | Props | "book stack 3d" |

### HDRI for Environment
- Download a dark space / night sky HDRI from **Polyhaven** (hdri.co)
- Or a studio HDRI with dark background for cleaner look
- Use `.hdr` format, load with `RGBELoader` via Drei's `<Environment>` component

### Formats & Pipeline
```
Download as .glb or .fbx
  ↓
Import into Blender
  ↓
Scale, position, apply color overrides (amber/navy palette)
  ↓
Export as .glb with:
  - DRACO compression enabled (reduces size ~70%)
  - Include textures
  - Apply modifiers
  ↓
Optimize in Blender: merge static background meshes
  ↓
Load in R3F with useGLTF + DRACOLoader
```

---

## Blender Workflow

### Scene Composition Steps

1. **Create a new Blender project** — set units to meters
2. **Import models one by one** — scale to consistent proportions
3. **Build the room layout:**
   - Desk at center (this is the HUB)
   - Monitors on desk surface
   - Bookshelf on left wall (or floating left)
   - Arcade cabinet in far corner
   - Trophy shelf on right wall
   - Server/tech rack in background
4. **No real walls needed** — the room is open on sides to reveal space
5. **Add empty floor plane** — subtle reflective surface (like a stage)
6. **Color palette pass** — override materials to stay within amber/navy/white range
7. **Mark interactive objects** — give them distinct names (e.g., `mesh_monitor_left`, `mesh_arcade`) so R3F can reference them by name via `scene.getObjectByName()`
8. **Export:** File → Export → glTF 2.0, enable DRACO, embed textures

### Model Naming Convention (for R3F targeting)
```
hub_desk
hub_chair
monitor_left            ← Projects screen (left)
monitor_right           ← Projects screen (right)
bookshelf_main          ← Experience zone
arcade_cabinet          ← Arcade zone
trophy_shelf            ← Awards zone
robot_skills            ← Skills/AI zone mascot
contact_github          ← GitHub social object
contact_linkedin        ← LinkedIn social object
deco_plant_a/b/c        ← Three plant variants
deco_mug                ← Coffee mug (steam shader target)
deco_books              ← Book stack
deco_cards              ← Playing cards (card magic prop)
deco_headphones         ← Headphones
deco_beanbag            ← Bean bag chair
deco_coffee_table       ← Low coffee table
deco_rubiks             ← Rubik's cube (interactive)
deco_clock              ← Digital clock (real-time display)
deco_lamp               ← Table lamp (R3F point light placed at lamp head)
deco_mouse              ← Computer mouse
deco_keyboard           ← Keyboard
deco_picture_frame      ← Picture frame (custom texture swap in R3F)
deco_anime_*            ← Anime figurines/props (pending search)
```

---

## Scene Navigation (same pattern as joan-portfolio)

Each named object in the scene has a **pre-calculated camera position + quaternion** stored as constants. Clicking an object runs a GSAP tween to that camera state.

```ts
// constants3d.ts — all camera positions, same pattern as joan's constants.js
export const CAMERA_POSITIONS = {
  hub: { position: [-10, 8, 10], target: [0, 0, 0] },
  projects: { position: [5, 3, 2], target: [3, 1.5, 0] },
  experience: { position: [-6, 4, 1], target: [-4, 2, 0] },
  arcade: { position: [4, 2, -3], target: [3, 1, -4] },
  awards: { position: [-3, 3, -2], target: [-2, 2, -3] },
  contact: { position: [0, 2, -6], target: [0, 1, -7] },
  skills: { position: [2, 6, 4], target: [0, 0, 0] },
}
```

Navigation flow:
1. User clicks object in scene → raycasting identifies it
2. Camera tweens to saved position with GSAP (0.8–1.2s, sine.out)
3. Hover outline activates on interactive meshes
4. HUD shows "Back" button → returns to hub camera position
5. HTML content panel slides in via `<Html>` at the target position

---

## Zone-by-Zone Object Map

### HUB — Default Camera (Isometric Overview)
- Desk, chair, all objects visible
- Soft ambient particles floating around the room
- Camera slowly auto-orbits until user interacts (then stops)

### PROJECTS — Dual Monitor Setup
- Camera flies close to monitors on the desk
- Monitor screens show project cards via Drei `<Html>` + existing `ProjectCard` component
- Left monitor: project grid (5 projects)
- Right monitor: expanded active project detail
- Screen glow with bloom on emissive screen material
- Click project → detail slides onto right monitor

### EXPERIENCE — Bookshelf
- Camera looks at the bookshelf
- Each shelf = one experience entry (Chubb, KCPL, NSS)
- Books glow amber on hover — click → opens floating info card (`<Html>`, existing `TimelineStop`)
- Current role (Chubb) has a brighter spine

### SKILLS / AI DNA — Robot Zone
- Camera looks at robot standing near/on the desk
- Robot's idle animation plays continuously
- Amber particle stream flows upward around it
- Clicking robot → camera zooms in → AI stack + practice tiles appear as floating `<Html>` panels
- Tech stack SVG icons orbit the robot as `<Html>` sprites

### AWARDS — Trophy Shelf
- Camera looks at trophy shelf/cabinet
- Each downloaded trophy model represents an award
- Warm amber lighting in this zone (point light inside the cabinet)
- Hover tooltip shows award name + date
- NSS story as floating scroll/panel nearby

### ARCADE MACHINE — Arcade Cabinet
- Camera flies to arcade cabinet corner
- CRT shader activates (scanlines + vignette + curvature)
- Keyboard input tunneled to the game canvas
- Game selector screen: pick from available mini-games
- Mute button visible in this zone (games have sound)

### CHILL CORNER — Bean Bag + Cards + Arcade Area
- Bean bag facing the arcade cabinet
- Coffee table between: mug resting on it (with steam), cards fanned out
- Headphones on hook near arcade or draped on bean bag
- Spade badge as small wall/shelf decoration — card magic easter egg
- This is also the **Contact zone**: social objects live here (casual vibe)
- GitHub and LinkedIn as 3D objects → click → opens URL
- Email object → opens mailto
- Gemini chat widget is a 2D `<Html>` overlay throughout the whole scene — not zone-specific

### DIGITAL CLOCK — Desk Prop
- A 3D digital clock model on the desk (or coffee table) showing real current time
- See [Digital Clock](#digital-clock--real-time-desk-prop) section for implementation details

---

## Interactive Elements (Raycasting List)

These are the objects R3F listens for `onPointerOver` / `onClick`:
```
monitor_left, monitor_right      ← Projects + project detail
bookshelf_main                   ← Experience zone
arcade_cabinet                   ← Arcade + game launcher
trophy_shelf, trophy_*           ← Awards with hover tooltips
robot_skills                     ← Skills/AI zone
contact_github                   ← Opens GitHub URL
contact_linkedin                 ← Opens LinkedIn URL
contact_email                    ← Opens mailto
deco_rubiks                      ← Interactive cube rotation (see Rubik's section)
deco_clock                       ← Timezone picker on click
deco_cards                       ← Easter egg: card fan animation + magic sound
deco_mug                         ← Easter egg: slurp sound + steam intensifies
deco_books                       ← Easter egg: random dev quote
deco_headphones                  ← Easter egg: plays lo-fi beat snippet
```

---

## Arcade Games

The arcade machine holds all playable games. Click cabinet → CRT effect → game selector.

### Game 1 — "Deploy Dash" — Endless Runner ⭐ Build first
Side-scroller. You're a build pipeline. Dodge bugs, merge conflicts, failed tests. Collect green checkmarks, coffee cups (speed boost), deploy banners (score multiplier). Amber pixel font, dark navy. Pure HTML5 canvas + `requestAnimationFrame`. ~200 lines of code.

### Game 2 — "Bug Hunt" — Whack-a-Mole
Bugs pop up on a code editor grid visualization. Click before they multiply. Simple, relatable, fast to build.

### Game 3 — "Stack Attack" — Tech Tetris
Falling blocks with real tech stack logos from your CV (Angular, React, Python, Java, Docker, K8s). Stack same category to clear rows. Easter egg: "Full Stack" clear → special cabinet flash animation.

### Game 4 — "Code Typer" — Typing Speed Game
Real code snippets from your actual stack fly toward a deadline. Type correctly to deploy. Miss = bugs. WPM tracked, localStorage high score. Shows off your taste in code style.

### Game 5 — "Interview Scheduler" — Puzzle Game
Grid calendar puzzle. Interview blocks fly in. Fit them without conflicts. Directly references RecruitMate ("98% effort eliminated" — but now you fight for it manually). Unique to you, nobody else's portfolio has this.

### Game 6 — "AI Training" — Sort & Label
Data points fall. Classify: bug / feature / tech debt. Accuracy % shown like a real model eval metric. References Chubb AI team work.

---

## What Makes It Yours (Not Joan's Room)

| Joan's Room | Dhanish's Cosmos Workshop |
|---|---|
| Cozy bedroom with carpet, coffee mug | Floating dev workspace in space — open walls, stars visible |
| Whiteboard for drawing | Whiteboard or holographic panel for code/notes (or replace with skills zone) |
| Rubik's cube puzzle | Arcade machine with 6 custom thematic games |
| No personality-specific objects | Objects reference actual work: RecruitMate → arcade game, NSS → awards shelf |
| CSS3D iframes (3 separate apps) | Drei `<Html>` — single Next.js app, existing React components reused |
| Baked textures (no lighting changes) | Realtime PBR — adjust lighting and materials without re-baking |
| LinkedIn / GitHub / itchio icons | Same concept, but amber-glowing orbs or custom brand models |
| Vanilla JS | React Three Fiber + TypeScript — proper component architecture |
| Desktop only, no fallback | Mobile: graceful fallback to standard 2D portfolio with explanation |
| Carpet fur shader | Steam from coffee mug (same idea, more desk-appropriate) |
| Procedural sky | Star field + nebula HDRI — deeper space feel |

---

## File Structure

```
/src
  /app
    /3d
      page.tsx                        ← dynamic import, ssr:false, mobile check
  /components
    /3d
      Experience3D.tsx                ← Canvas wrapper, post-processing, zone state
      World3D.tsx                     ← Loads GLB + composes entire scene
      Camera3D.tsx                    ← Camera ref + GSAP tween helpers
      NavigationBanner3D.tsx          ← HTML overlay nav (zone links + back button)
      LoadingScreen3D.tsx             ← Progress bar overlay during asset load
      constants3d.ts                  ← All camera positions, targets, timings
      /zones
        HubZone.tsx                   ← Default overview, auto-orbit
        ProjectsZone.tsx              ← Monitor screens + project cards
        ExperienceZone.tsx            ← Bookshelf + timeline cards
        SkillsZone.tsx                ← Server rack + robot + AI stack
        AwardsZone.tsx                ← Trophy shelf + warm lighting
        ArcadeZone.tsx                ← Cabinet + CRT shader + game launcher
        ContactZone.tsx               ← Social objects + email
      /effects
        StarField.tsx                 ← Particle star background
        NebulaBackground.tsx          ← Ambient nebula glow (shader plane)
        AmberParticles.tsx            ← Floating room particles
        CoffeeSteam.tsx               ← Same technique as joan's steam shader
        CRTOverlay.tsx                ← Scanlines + vignette for arcade
      /post
        PostProcessing3D.tsx          ← Bloom, Outline, SMAA
      /games
        GameLauncher.tsx              ← Game selector UI
        DeployDash.tsx
        BugHunt.tsx
        StackAttack.tsx
        CodeTyper.tsx
        InterviewScheduler.tsx
  /hooks
    useCamera3D.ts                    ← GSAP tweens to zone positions
    use3DNavigation.ts                ← Active zone state, back button logic

/public
  /assets
    /3d
      /models
        workshop.glb                  ← Full scene export from Blender (DRACO)
        social_icons.glb              ← GitHub, LinkedIn, email models (separate for interaction)
      /textures
        /hdri
          space_dark.hdr              ← Environment map from Polyhaven
      /draco
        draco_decoder.wasm            ← DRACO decoder (copy from three/examples/jsm/libs/draco)
        draco_decoder.js
```

---

## Technical Challenges

| Challenge | Difficulty | Solution |
|---|---|---|
| Next.js SSR + Three.js | Low | `dynamic(() => ..., { ssr: false })` |
| GLB loading with DRACO | Low | Drei `useGLTF` + configure `DRACOLoader` path once |
| Extracting named meshes from GLB | Low | `scene.getObjectByName('monitor_left')` or traverse |
| HDRI environment in R3F | Low | Drei `<Environment files="space_dark.hdr" />` |
| GSAP camera quaternion tweening | Medium | Port from joan's `Navigation.js` — solved pattern |
| Overlay HTML content on 3D objects | Low | Drei `<Html>` with `occlude` prop for depth sorting |
| Post-processing bloom | Low | `@react-three/postprocessing` — ~10 lines |
| CRT shader for arcade | Medium | Port shaders from joan's `screenEffect` shaders |
| Coffee steam shader | Medium | Port from joan's `coffeeSteam` shaders — Perlin noise |
| Blender model sourcing + cleanup | Medium | Time investment — finding consistent-style models |
| Performance with many models | Medium | Merge static meshes in Blender before export |
| Hover raycasting | Low | R3F `onPointerOver` / `onPointerOut` on mesh components |
| Arcade game canvas in 3D | Medium | `<Html>` wrapper with canvas inside, keyboard passthrough |
| Mobile fallback | Low | `useEffect` UA detect → redirect to `/` with banner |

---

## Blender → Web Optimization Checklist

Before exporting the final `.glb`:
- [ ] Merge all static non-interactive meshes into as few objects as possible (reduces draw calls)
- [ ] Keep interactive objects as separate named meshes
- [ ] Remove unused vertices, apply transforms (Ctrl+A → All Transforms)
- [ ] Check texture sizes — downscale anything above 2048×2048 for non-hero objects
- [ ] Enable DRACO compression on export
- [ ] Test import in Three.js editor (threejs.org/editor) before integrating into app

Target file size: **< 15MB** total for workshop.glb. If over, split into `room_static.glb` and `room_interactive.glb` and load interactive parts after initial render.

---

## Implementation Phases

### Phase 1 — Foundation (1–2 days)
- [ ] Install all dependencies
- [ ] `/src/app/3d/page.tsx` with SSR-disabled canvas + mobile fallback
- [ ] `constants3d.ts` file created (fill in positions as scene is built)
- [ ] Star field + HDRI environment
- [ ] Basic ambient + point lighting
- [ ] `useCamera3D` hook with GSAP tweens
- [ ] "3D Mode" button in existing `Navbar.tsx`
- [ ] "Exit 3D" HUD overlay button
- [ ] Loading screen with `<Loader>` from Drei

### Phase 2 — Asset Gathering + Blender (3–5 days, can run parallel to Phase 1)
- [ ] Download all approved models from the manifest
- [ ] Compose room in Blender — desk, monitors, bookshelf, arcade, trophies, chill corner
- [ ] Place robot, plants, mug, cards, headphones, bean bag, coffee table, clock, Rubik's cube
- [ ] Apply consistent material/color palette pass
- [ ] Name all meshes per naming convention
- [ ] Export `workshop.glb` with DRACO
- [ ] Export `social_icons.glb` separately (interactive, may need swap at runtime)
- [ ] Download and test space HDRI from Polyhaven

### Phase 3 — Scene Integration (2–3 days)
- [ ] Load `workshop.glb` via `useGLTF` in `World3D.tsx`
- [ ] Set up HDRI environment
- [ ] HUB camera position — confirm the overview looks right
- [ ] Wire up raycasting (onPointerOver / onClick per interactive mesh)
- [ ] GSAP camera tweens to each zone
- [ ] Hover outline effect via postprocessing `<Outline>`
- [ ] Navigation banner HTML overlay

### Phase 4 — Zone Content (3–4 days)
- [ ] Projects zone: `<Html>` on monitors, project cards from existing data
- [ ] Experience zone: bookshelf interaction, timeline cards via `<Html>`
- [ ] Skills zone: robot + AI stack panels + particle stream
- [ ] Awards zone: trophy hover tooltips + warm point light
- [ ] Chill corner + contact: social objects click → open URL
- [ ] Digital clock component (real-time IST, timezone toggle)
- [ ] Effects: coffee steam shader, ambient particles, nebula background
- [ ] Post-processing: Bloom, SMAA

### Phase 5 — Interactions + Easter Eggs (2 days)
- [ ] Rubik's cube rotation mechanic (see Rubik's section)
- [ ] Card fan animation on click + magic swoosh sound
- [ ] Mug click: slurp sound + steam intensifies briefly
- [ ] Headphones click: lo-fi beat snippet
- [ ] Books click: random dev quote popup
- [ ] Anime prop interactions (pending final model selection)

### Phase 6 — Arcade Machine (2–3 days)
- [ ] CRT overlay shader on arcade screen
- [ ] `GameLauncher.tsx` selector UI
- [ ] Deploy Dash — endless runner (first game)
- [ ] Bug Hunt — whack-a-mole (second game)
- [ ] Score persistence (localStorage)
- [ ] Keyboard passthrough to game canvas
- [ ] Optional: 2–3 more games

### Phase 7 — Polish + Deploy (2 days)
- [ ] Tune all GSAP timing and easing values
- [ ] Performance audit — check draw calls with Drei `<Stats>`
- [ ] Remove leva dev panels
- [ ] Attribution credits page / footer section
- [ ] Mobile fallback page with explanation and link to 2D version
- [ ] Netlify deploy + test

**Total estimate: ~3–4 weeks** (Phase 2 asset work is the wildcard — depends on how long Blender composition takes).

---

## Notes

- All portfolio content data comes from `/src/data/*.ts` — no duplication
- Gemini chatbot (`AskDhanish`) stays as a floating 2D overlay via `<Html>` — it already works
- The existing `/` route is completely untouched — 3D is purely additive
- CLAUDE.md says Angular 20 — **wrong for this branch**. This is Next.js 14 + React 18.
- joan-portfolio reference is at `/tmp/joan-portfolio` — the shader files (`coffeeSteam`, `screenEffect`) are worth porting directly

---

## Rubik's Cube — Interactive Desk Toy

The Rubik's cube sits on the desk as a clickable prop. Approach: **source a GLB model** (pending search results) OR build procedurally (27 `BoxGeometry` cubes in 3×3×3 arrangement with colored faces — same as joan's approach). Procedural is actually fine here since the cube is just 27 small boxes.

### Interaction Design

Joan's full solver + drag-rotation is complex (~300 lines). A simplified version that's still impressive:

**Click cube → camera zooms to desk close-up → cube becomes interactive:**
- **Drag a row/column** → that layer rotates 90°
- Rotation uses `THREE.Group` per layer (X/Y/Z slice) — same parent-child trick as joan
- No auto-solver required — keep it as a manual toy
- **Scramble button** (in HUD) → randomizes cube state with animated moves
- **Reset button** → animates back to solved state
- Solved state triggers: small confetti burst + a sound effect (easter egg)

### Simplified Implementation (vs joan's full solver)

```tsx
// RubiksCube.tsx — simplified interactive version
// Each of 27 cubies is a BoxGeometry with 6 colored face materials
// Click → detect which face was hit → determine rotation axis
// Animate the 9 cubies in that slice rotating 90° around the axis
// No solver needed — just rotate + track state
```

### GLB vs Procedural Decision
- If search finds a clean low-poly Rubik's cube GLB: import it, extract individual cubie meshes by name
- If not: build procedurally — 27 `mesh(boxGeometry, [6 materials])` — total control, easy coloring
- Procedural is actually recommended for interactivity (easier to manipulate individual cubies in code)

---

## Digital Clock — Real-Time Desk Prop

A 3D digital clock on the desk (or coffee table) showing live time. Visible from the HUB overview. Clickable to change timezone.

### Visual Design
- LED/7-segment display aesthetic — retro digital clock look
- Glowing amber digits (matches brand color)
- "HH:MM:SS" format — seconds ticking is satisfying in 3D
- Optional: date on a second line

### Implementation — Canvas Texture (best approach)

```tsx
// DigitalClock3D.tsx
// 1. Create an offscreen <canvas> 512×128px
// 2. Draw current time string with a 7-segment style font (or canvas fillText)
// 3. Apply canvas as a CanvasTexture to a PlaneGeometry mapped onto the clock screen mesh
// 4. useFrame() updates canvas + texture.needsUpdate = true every second
// 5. Clock mesh is a child of the clock model (or a standalone plane on desk)
```

This is identical to joan's whiteboard approach — `CanvasTexture` + `texture.needsUpdate = true`.

### Timezone Logic

```tsx
// useClockTime.ts
const [timezone, setTimezone] = useState(
  Intl.DateTimeFormat().resolvedOptions().timeZone  // auto-detect browser timezone
);
// Default fallback if detection fails: 'Asia/Kolkata' (IST, UTC+5:30)

const formattedTime = new Date().toLocaleTimeString('en-US', {
  timeZone: timezone,
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
```

### Timezone Picker (on clock click)
- Click clock → small floating UI panel appears (Drei `<Html>`)
- Dropdown or buttons: IST | UTC | Local | Custom
- "Local" = browser's detected timezone
- "Custom" = text input for IANA timezone string (e.g., `America/New_York`)
- Selection persists in `localStorage`
- Panel closes on click-away or back button

### Clock Model Options
- Source a digital alarm clock / desk clock GLB (pending — check Sketchfab)
- Or: place a simple `BoxGeometry` with the CanvasTexture screen as the face — no model needed
- The canvas texture approach means the "clock" can be any shaped mesh — flexibility

---

## Anime Props — Pending Search Results

The anime search agent is running. Expected finds:
- Totoro figurine / Pokémon figure for desk
- Katana / samurai sword as wall decoration
- Lucky cat (maneki-neko) as desk charm
- Manga volumes stacked (alongside the book stack)
- Bonsai tree for Japanese aesthetic

These will live on the desk, bookshelf, or as wall decorations. Final list pending agent results.

---

## Blender Scene — Changelog & Handoff

> Working file: `Blender sources/cosmos_workshop.blend` (Blender 5.1, EEVEE-Next). Blender auto-keeps a `.blend1` backup. Latest reference render committed at repo root: `cosmos_workshop_current.png`. Edits were done live via the Blender MCP connector.

### Changelog (2026-06-13)

Art-direction + bug-fix pass on the composed room. Camera is a tightened isometric 3/4 diorama view.

**Lighting & tone**
- View transform set to **AgX → Medium High Contrast**, exposure ≈ −0.2 (was flat/milky AgX default).
- Rebalanced all point/area lights into cozy warm pools; killed the over-bright ceiling/window blowout.
- Signature accents boosted: **blue desk underglow**, **red arcade neon**.
- Added `light_warm_fill_right` (warm point) to lift the previously cold/empty window side.
- Added/relocated `light_bookshelf` to light the new bookcase front.
- Warmed wall albedo (`mat_back_wall_left`) to taupe-amber.

**Layout / structure**
- **Tightened the room**: shrank the `floor` plane depth (was ~10m → ~6.4m) to crop dead floor.
- Pulled the chill nook (`deco_beanbag`, `deco_coffee_table`, `rug_chill`, `deco_cards`) into a tighter centered cluster facing the arcade; muted the loud red rug to terracotta.
- Reframed `Camera` to a closer diorama framing.

**Assets fixed**
- **Monitors** (`monitors_group`) were floating ~40cm above the desk → seated on the desk surface; screens given a **blue emissive** material (`mat21`) for the "projects screen" glow.
- **Bookshelf**: the original `bookshelf_main`/`BookCase_Single` was a degenerate 1.8cm mesh stuck at world origin. Deleted it and **re-imported `Bookcase with Books.glb`** clean (renamed root → `bookshelf_main`, doors `BookCase_*Door` hidden to show open shelves, scaled ~2.2m, placed left of desk). Lifted dark book-cover albedos so spines read.
- **Headphones**: original was a corrupt GLB rendering as a giant brown "cabinet" (the thing that looked like a reversed bookshelf). Deleted; **re-imported `Headphones.glb`**, joined its 17 loose meshes into `deco_headphones_new`, scaled to ~28cm, placed on the coffee table.
- **Rubik's cube** (`deco_rubiks`): a ~26k-unit broken mesh that was slicing through the room as a black band. **Hidden** (`hide_render=True`, scale 0). Per plan this is built procedurally in R3F anyway.
- **Duplicate/broken walls**: hid the leftover piecewise `back_wall_top/bottom/left/right` (mis-scaled, z-fighting `backwall_full`).
- **Awards shelf**: the old wall shelf sat *behind* the wall with floating trophies. Built a new `award_shelf` plank on the back wall above the desk. Only `trophy_01` had real geometry (`Cube`, 1152 verts); `trophy_02`/`trophy_03` were empty placeholders — duplicated the real trophy mesh into `trophy_dup_2`/`trophy_dup_3` and spread all three across the shelf.

### ⚠️ Known broken-asset pattern
Several source GLBs imported as **degenerate / wrongly-scaled meshes** (collapsed bound-box, origin far from geometry, render-only/invisible to raycast): the Rubik's cube, the original headphones, the original bookcase. If other props look wrong, suspect the same. **Fix recipe:** delete the broken object, re-import the GLB from `Blender sources/`, join loose meshes if needed (`bpy.ops.object.join`), `origin_set(type='ORIGIN_GEOMETRY')`, then scale/place. Verify with an evaluated-mesh world-bounds check, not the raw `bound_box`.

### Changelog (2026-06-13, session 2) — Export + R3F foundation

Took the scene from Blender into a live, working R3F app. Verified in a real browser (Chrome/Electron preview): the GLB loads via DRACO, HDRI lights the room, robot/desk/monitors/arcade/trophies/chill-nook all render, and GSAP zone navigation flies the camera with the HUD updating.

- **Export done:** `public/assets/3d/models/workshop.glb` exported with DRACO (level 6) + embedded textures + the robot idle animation. **9.95 MB** (under the 15 MB target — no static/interactive split needed). Used `use_renderable=True` so the hidden broken meshes (`deco_rubiks`, duplicate walls, `light_shelf_key`) are excluded; the `glTF_not_exported` collection (stray `Icosphere`) is auto-skipped. Named empties (`monitors_group`, `hub_desk`, `bookshelf_main`, `arcade_cabinet`, `robot_skills`, `award_shelf`, `deco_*`) survive as nodes for `getObjectByName`/parent-climb zone resolution.
- **Did NOT apply transforms** (`Ctrl+A`) — risky with the rigged robot armature, and glTF preserves transforms anyway. Skipped deliberately.
- **HUB camera baked** into `constants3d.ts` 1:1 from the Blender `Camera` (Blender Z-up → three Y-up: `(x,y,z)→(x,z,-y)`). Other zone positions are derived starting offsets toward each interactive object's real world coords — **tune live with leva** (installed).
- **DRACO decoder** copied to `public/assets/3d/draco/` (`draco_decoder.wasm` + `draco_wasm_wrapper.js`); drei `useGLTF(url, '/assets/3d/draco/')` points at it.
- **Deps installed** (React-18-compatible majors): `three@0.169`, `@react-three/fiber@8`, `@react-three/drei@9`, `@react-three/postprocessing@2`, `gsap@3`; dev `@types/three`, `leva`. (Do NOT bump fiber→9 / drei→10; those need React 19.)
- **Code written:** `src/app/3d/page.tsx` (dynamic `ssr:false` + mobile fallback — note the UA-first check, `window.innerWidth` can report 0 headless), `components/3d/Experience3D.tsx` (Canvas, Environment, Stars, fog, Bloom+SMAA, OrbitControls), `World3D.tsx` (GLB load + anim + hover/click→zone via parent-climb), `NavigationBanner3D.tsx`, `RubiksCube.tsx` (procedural 27-cubie, idle-spin stub), `constants3d.ts`, `hooks/useCamera3D.ts` (GSAP fly). Added a "3D" link to `Navbar.tsx`.
- **Bookcase note:** confirmed it's correctly placed but occluded behind the desk/monitors from the HUB angle. Left as-is — R3F frames it separately for the Experience zone. Flipping it 180° made no visible difference (reverted).

**Open polish (next):** R3F tone mapping (ACESFilmic) + HDRI make the room brighter/flatter than the Blender AgX look — tune lights/exposure (Phase 4/7). Procedural Rubik's cube placement `[1.3,0.95,6.6]` sits a touch high near the monitors — nudge onto the desk surface. Zone camera offsets are first-pass — refine with leva. Then Phase 4 zone content (`<Html>` panels), effects (coffee steam, particles), and the arcade games.

### Pending items (pick up here)

**Blender (finish the scene)**
- [ ] Verify trophies/bookcase from the final HUB camera at full res; nudge if occluded.
- [ ] Optional: re-seat `deco_cards` + `deco_mug` cleanly on the coffee table (steam shader target is `deco_mug`).
- [ ] Consider re-importing any remaining broken props (audit each prop with the recipe above).
- [ ] Bloom was attempted in the Blender 5.1 compositor but blew out white — **leave bloom to R3F** (`@react-three/postprocessing`), do not bake it here.
- [ ] Decide on ceiling: currently present; open-top "floating in space" look is an option (hide `ceiling`/`ceiling_full`).
- [ ] Anime props still pending (see section above).

**Export pipeline (Phase 2 → 3 bridge) — ✅ DONE (session 2)**
- [x] ~~Apply transforms on hero meshes~~ — deliberately skipped (armature risk; glTF keeps transforms).
- [x] Interactive meshes keep their **named** objects (verified: parent-climb zone resolution works in R3F).
- [x] Exported `public/assets/3d/models/workshop.glb` with **DRACO** + embedded textures — 9.95 MB, no split needed.
- [x] Baked HUB position/target into `constants3d.ts` from the Blender `Camera`.
- [x] HDRI wired via Drei `<Environment files="/assets/3d/textures/hdri/space.hdr">`.

**R3F (Phase 1/3) — ✅ FOUNDATION DONE (session 2), browser-verified**
- [x] Deps installed; `/src/app/3d/page.tsx` (dynamic `ssr:false` + mobile fallback).
- [x] `Experience3D` / `World3D` / `useCamera3D` GSAP tweens / `NavigationBanner3D` zone nav built and working.
- [x] Rubik's cube re-created procedurally (27 cubies) — idle-spin stub; drag/scramble is Phase 5.
- [ ] **Next:** tune lighting/exposure to match the Blender AgX mood; refine zone camera offsets (leva); Phase 4 zone `<Html>` content; effects; arcade games.
