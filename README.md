# Sweater Memory - Interactive 3D Experience

A romantic, cinematic web experience featuring a 3D sweater model, beautiful animations, and a personal letter reveal.

## Experience Flow

1. **Opening Scene**: Beautiful 3D sweater with ambient lighting and smooth orbit controls
2. **Romantic Text**: "I still remember... 3rd of December"
3. **Interactive Button**: Click to begin the cinematic sequence
4. **Animation Sequence**:
   - Sweater opens and rotates
   - Camera zooms into the sweater
   - Screen fades to black
   - Darkness slowly lifts
   - Personal PDF letter appears
   - Romantic background music begins playing

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Assets
Place your files in the `public/assets/` folder:
- `sweater.glb` - Your 3D sweater model
- `background-music.mp3` - Your romantic background music
- `letter.pdf` - Your personal letter/message

See `public/assets/README.md` for detailed asset requirements.

### 3. Run Development Server
```bash
npm run dev
```

Open your browser to `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

The production files will be in the `dist/` folder.

## Features

### 3D Rendering
- **Three.js** integration with WebGL
- Professional 3-point lighting setup (key, fill, rim)
- Real-time shadows and reflections
- Smooth orbit controls with limited rotation
- Responsive canvas that adapts to screen size
- Automatic fallback for missing 3D model

### Animations
- **GSAP** powered smooth animations
- Sweater opening effect
- Cinematic camera zoom
- Fade transitions (black in/out)
- Configurable timing and easing

### PDF Viewer
- **PDF.js** integration
- Multi-page support with navigation
- Responsive scaling for all screen sizes
- Mobile-friendly interface
- Graceful placeholder for missing PDFs

### Audio
- Background music with auto-loop
- Smooth 3-second fade-in
- Volume control (60% default)
- Browser autoplay compliance
- Continues silently if music file missing

### User Experience
- Loading states with elegant animations
- Smooth transitions between all states
- Mobile responsive design
- Touch-friendly controls
- Accessibility considerations
- Beautiful typography (Cormorant Garamond)

## Project Structure

```
project/
├── public/
│   └── assets/
│       ├── sweater.glb           # 3D model (add yours)
│       ├── background-music.mp3   # Audio file (add yours)
│       ├── letter.pdf             # PDF document (add yours)
│       └── README.md              # Asset requirements
├── src/
│   ├── components/
│   │   ├── Scene3D.tsx           # Three.js 3D scene
│   │   ├── Overlay.tsx           # Text and button UI
│   │   └── PDFViewer.tsx         # PDF display component
│   ├── utils/
│   │   ├── animations.ts         # GSAP animation sequences
│   │   └── audioManager.ts       # Audio playback controller
│   ├── hooks/
│   │   └── useThreeScene.ts      # Three.js scene hook
│   ├── App.tsx                   # Main app orchestrator
│   ├── index.css                 # Global styles
│   └── main.tsx                  # React entry point
├── DEPLOYMENT.md                  # Deployment instructions
├── ASSET_CONFIGURATION.md         # Detailed customization guide
└── README.md                      # This file
```

## Customization

### Asset Paths
See `ASSET_CONFIGURATION.md` for complete customization options.

**Quick Change Example:**
```typescript
// In src/App.tsx
<Scene3D
  modelPath="/custom/path/model.glb"
  onLoadComplete={() => setSceneLoaded(true)}
/>
```

### Animation Timing
Edit `src/utils/animations.ts`:
- Opening animation: Line 23 (duration: 1.5s)
- Zoom animation: Line 51 (duration: 2.5s)
- Fade transitions: Lines 68 and 82

### Text Content
Edit `src/components/Overlay.tsx`:
- Lines 12-14: Main text
- Line 22: Button text

### Colors and Styling
- Scene background: `src/components/Scene3D.tsx` line 25
- Lighting: `src/components/Scene3D.tsx` lines 57-75
- UI styling: `src/components/Overlay.tsx`
- Global styles: `src/index.css`

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Three.js** - 3D rendering and WebGL
- **GSAP** - Professional animations
- **PDF.js** - PDF rendering
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library (available if needed)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+ (iOS 14+)
- Mobile browsers (responsive design)

## Performance

- Optimized bundle with code splitting
- Lazy loading of 3D assets
- Efficient Three.js rendering loop
- Smooth 60 FPS animations
- Mobile performance optimizations
- Asset preloading for smooth experience

## Graceful Degradation

The experience includes fallbacks for missing assets:
- **No 3D Model**: Beautiful torus placeholder appears
- **No Audio**: Experience continues silently
- **No PDF**: Romantic placeholder message with instructions

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Documentation

- **DEPLOYMENT.md** - Build and deployment guide
- **ASSET_CONFIGURATION.md** - Complete customization reference
- **public/assets/README.md** - Asset requirements and specs

## Tips for Best Results

### 3D Model
- Keep under 5MB for fast loading
- Center at world origin (0, 0, 0)
- Use GLB format for best compatibility
- Optimize polygons and textures

### Music
- Use MP3 format (best browser support)
- 128-192 kbps for good quality/size balance
- Consider instrumental or ambient tracks
- Keep under 5MB if possible

### PDF
- Optimize for web viewing
- Consider file size (under 10MB recommended)
- Use readable fonts and good contrast
- Test on mobile devices

## Troubleshooting

### Model not appearing
1. Check file path: `public/assets/sweater.glb`
2. Verify file format (GLB/GLTF)
3. Check browser console for errors
4. Try the placeholder (should appear if model missing)

### Music not playing
1. Click the button (audio requires user interaction)
2. Check file path: `public/assets/background-music.mp3`
3. Verify browser allows autoplay after interaction
4. Check browser console for errors

### PDF not showing
1. Check file path: `public/assets/letter.pdf`
2. Verify PDF is not password-protected
3. Check file size (large PDFs may load slowly)
4. Check browser console for errors

### Build errors
1. Run `npm install` to ensure all dependencies
2. Check for TypeScript errors: `npm run typecheck`
3. Verify all imports are correct
4. Check browser console for runtime errors

## License

This project is provided as-is for personal use.

## Credits

Built with modern web technologies:
- Three.js for stunning 3D graphics
- GSAP for buttery-smooth animations
- PDF.js for document rendering
- React for component architecture

---

**Ready to create your romantic experience?**

1. Add your assets to `public/assets/`
2. Run `npm run dev`
3. Open `http://localhost:5173`
4. Click "REMEMBER" and enjoy the magic
