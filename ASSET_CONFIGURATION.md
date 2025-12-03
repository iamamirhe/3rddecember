# Asset Configuration Guide

This document explains how to configure and customize the assets used in the sweater experience.

## Overview

The experience uses three main assets:
1. **3D Sweater Model** - The centerpiece of the visual experience
2. **Background Music** - Plays during the PDF reveal
3. **PDF Letter** - The final romantic message

## Quick Configuration

### Option 1: Use Default Paths (Recommended)
Simply place your files in the `public/assets/` folder with these exact names:
- `sweater.glb`
- `background-music.mp3`
- `letter.pdf`

### Option 2: Custom Paths
If you want to use different filenames or locations, update these files:

#### 3D Model Path
**File**: `src/App.tsx`
**Line**: ~98

```typescript
<Scene3D
  modelPath="/your/custom/path/model.glb"  // Change this
  onLoadComplete={() => setSceneLoaded(true)}
/>
```

#### Background Music Path
**File**: `src/App.tsx`
**Line**: ~22 (or modify the audioManager.ts file)

```typescript
// Option A: In App.tsx
const audioManagerRef = useRef(createAudioManager('/your/custom/path/music.mp3'));

// Option B: In src/utils/audioManager.ts (line 6)
constructor(audioUrl: string = '/your/custom/path/music.mp3') {
```

#### PDF Path
**File**: `src/App.tsx`
**Line**: ~119

```typescript
<PDFViewer
  pdfUrl="/your/custom/path/document.pdf"  // Change this
  visible={showPDF}
/>
```

## Asset Specifications

### 3D Model Requirements

**Supported Formats:**
- GLB (recommended)
- GLTF

**Optimization Tips:**
- Keep file size under 5MB for fast loading
- Center the model at world origin (0, 0, 0)
- Scale should be reasonable (around 1-2 units)
- Include proper materials and textures
- Consider baking lighting for better performance

**Recommended Tools:**
- Blender (free, open-source)
- Sketchfab (for downloading/optimizing models)
- gltf-pipeline (command-line optimization)

**Blender Export Settings:**
- Format: glTF Binary (.glb)
- Include: Selected Objects
- Transform: +Y Up
- Geometry: Apply Modifiers, UVs, Normals
- Compression: Draco (optional, for smaller files)

### Audio Requirements

**Supported Formats:**
- MP3 (recommended - best browser support)
- WAV (larger file size)
- OGG (good compression, limited browser support)

**Specifications:**
- Bitrate: 128-192 kbps (good balance)
- Sample Rate: 44.1 kHz or 48 kHz
- Channels: Stereo or Mono
- Length: Any (will loop automatically)

**Built-in Features:**
- Auto-loop: Yes
- Volume: 60% (adjustable)
- Fade-in: 3 seconds smooth fade
- Starts: After button click, during PDF reveal

**Volume Adjustment:**
Edit `src/utils/audioManager.ts`, line 9:
```typescript
this.audio.volume = 0.6;  // Change to 0.0-1.0
```

### PDF Requirements

**Specifications:**
- Format: Standard PDF
- Pages: Any number (navigation included for multi-page)
- Size: Recommend under 10MB for fast loading
- Protection: Must not be password-protected
- Orientation: Any (auto-scales to screen)

**Features:**
- Responsive scaling
- Multi-page navigation (if applicable)
- Mobile-friendly viewing

## Animation Customization

### Opening Animation (Sweater Opening)

**File**: `src/utils/animations.ts`
**Function**: `playOpeningAnimation` (lines 11-38)

```typescript
// Rotation duration
duration: 1.5,  // Change this (in seconds)

// Scale timing
duration: 1,    // Change this (in seconds)

// Opening effect offset
const offset = (index % 2 === 0 ? 0.3 : -0.3);  // Adjust spread
```

### Camera Zoom Animation

**File**: `src/utils/animations.ts`
**Function**: `playCameraZoomAnimation` (lines 40-61)

```typescript
// Zoom speed
duration: 2.5,  // Change this (in seconds)

// Final camera distance
z: 0.5,        // Change this (smaller = closer)

// Sweater scaling
x: 4, y: 4, z: 4,  // Change these (larger = bigger)
```

### Fade Transitions

**File**: `src/utils/animations.ts`

**Fade to Black** (lines 63-75):
```typescript
duration: 1.5,  // Change fade-out speed (seconds)
```

**Fade from Black** (lines 77-87):
```typescript
duration: 2,    // Change fade-in speed (seconds)
```

## Scene Customization

### Lighting Setup

**File**: `src/components/Scene3D.tsx`

**Ambient Light** (line 57):
```typescript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// Color: 0xffffff (white)
// Intensity: 0.5 (adjust 0.0-1.0)
```

**Key Light** (line 60):
```typescript
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 8, 5);  // X, Y, Z position
// Intensity: 1.2
```

**Fill Light** (line 69):
```typescript
const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.4);
fillLight.position.set(-5, 3, -5);
// Color: 0x87ceeb (sky blue)
// Intensity: 0.4
```

**Rim Light** (line 73):
```typescript
const rimLight = new THREE.DirectionalLight(0xffa07a, 0.6);
rimLight.position.set(0, 3, -5);
// Color: 0xffa07a (light salmon/warm)
// Intensity: 0.6
```

### Background Color

**File**: `src/components/Scene3D.tsx`
**Line**: 25

```typescript
scene.background = new THREE.Color(0x1a1a2e);
// Change to any hex color (e.g., 0x000000 for black)
```

### Camera Settings

**File**: `src/components/Scene3D.tsx`
**Lines**: 27-33

```typescript
const camera = new THREE.PerspectiveCamera(
  45,         // Field of view (degrees)
  window.innerWidth / window.innerHeight,  // Aspect ratio (auto)
  0.1,        // Near clipping plane
  1000        // Far clipping plane
);
camera.position.set(0, 1, 5);  // X, Y, Z position
```

### Orbit Controls

**File**: `src/components/Scene3D.tsx`
**Lines**: 51-55

```typescript
controls.minDistance = 3;              // Closest zoom
controls.maxDistance = 8;              // Farthest zoom
controls.maxPolarAngle = Math.PI / 1.8;  // Lowest view angle
controls.minPolarAngle = Math.PI / 3;    // Highest view angle
controls.enablePan = false;            // Disable panning
```

## UI Customization

### Text Content

**File**: `src/components/Overlay.tsx`
**Lines**: 12-14

```typescript
<h1 className="...">
  I still remember...
  <br />
  <span className="...">3rd of December</span>
</h1>
```

### Button Text

**File**: `src/components/Overlay.tsx`
**Line**: 22

```typescript
<span className="...">
  REMEMBER  // Change this text
</span>
```

### Typography

**File**: `src/index.css`
**Line**: 5

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap');
/* Change to any Google Font */

body {
  font-family: 'Cormorant Garamond', serif;  /* Update here too */
}
```

## Environment Variables (Optional Advanced Setup)

Create `.env` file in project root:

```env
VITE_MODEL_PATH=/assets/sweater.glb
VITE_AUDIO_PATH=/assets/background-music.mp3
VITE_PDF_PATH=/assets/letter.pdf
```

Then update components to use:
```typescript
const modelPath = import.meta.env.VITE_MODEL_PATH || '/assets/sweater.glb';
```

## Testing Your Configuration

1. Make your changes
2. Run `npm run dev`
3. Open browser to `http://localhost:5173`
4. Check browser console for any errors
5. Test the full animation sequence

## Common Issues

### Model Appears Too Large/Small
- Adjust scale in Blender before export, OR
- Modify initial scale in Scene3D.tsx line 85

### Model Appears Dark
- Increase ambient light intensity
- Adjust key light position/intensity
- Check model has proper materials

### Animation Too Fast/Slow
- Adjust duration values in animations.ts
- All durations are in seconds

### Music Not Playing
- Check browser autoplay policy (requires user interaction)
- Verify audio format is supported
- Check file path is correct

## Need Help?

Refer to:
- `DEPLOYMENT.md` for build and deployment
- `public/assets/README.md` for asset requirements
- Browser console for error messages
- Three.js documentation: https://threejs.org/docs/
