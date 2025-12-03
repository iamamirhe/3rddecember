# Deployment Guide

## Quick Start

1. **Add Your Assets**
   - Place your 3D sweater model at: `public/assets/sweater.glb`
   - Place your music file at: `public/assets/background-music.mp3`
   - Place your PDF letter at: `public/assets/letter.pdf`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Asset Requirements

### 3D Model (sweater.glb)
- Format: GLB or GLTF
- Recommended size: Under 5MB
- Should be centered at origin (0, 0, 0)
- Proper UV mapping for best visual quality

### Audio File (background-music.mp3)
- Format: MP3, WAV, or OGG
- Recommended: MP3 for best browser compatibility
- Will loop automatically
- Volume: 60% with 3-second fade-in

### PDF File (letter.pdf)
- Format: PDF
- Any number of pages supported
- Responsive scaling included

## Customization Options

### Change Asset Paths

Edit `src/App.tsx` to customize file locations:

```typescript
// Custom 3D model path
<Scene3D
  modelPath="/path/to/your/model.glb"
  onLoadComplete={() => setSceneLoaded(true)}
/>

// Custom audio path
const audioManagerRef = useRef(createAudioManager('/path/to/your/audio.mp3'));

// Custom PDF path
<PDFViewer
  pdfUrl="/path/to/your/document.pdf"
  visible={showPDF}
/>
```

### Adjust Animation Timings

Edit `src/utils/animations.ts`:
- `playOpeningAnimation`: Controls sweater opening (default: 1.5s)
- `playCameraZoomAnimation`: Controls zoom effect (default: 2.5s)
- `fadeToBlack`: Controls fade timing (default: 1.5s)
- `fadeFromBlack`: Controls reveal timing (default: 2s)

### Modify Colors and Styling

Edit `src/components/Overlay.tsx`:
- Text styling
- Button appearance
- Typography

Edit `src/index.css`:
- Font families
- Animation curves
- Global styles

### Adjust 3D Scene

Edit `src/components/Scene3D.tsx`:
- Lighting setup (lines 57-75)
- Camera position (line 33)
- Background color (line 25)
- Orbit controls limits (lines 51-55)

## Production Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload contents of 'dist' folder to your server
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 11+)
- Mobile: Fully responsive

## Performance Tips

1. **Optimize 3D Model**
   - Use Blender or similar tools to reduce polygon count
   - Compress textures to reasonable sizes
   - Remove unnecessary animations or metadata

2. **Compress Audio**
   - Use 128-192 kbps MP3 for good quality/size balance
   - Consider using web-optimized audio formats

3. **Optimize PDF**
   - Reduce file size using PDF optimization tools
   - Consider lower-resolution images inside PDF

## Troubleshooting

### 3D Model Not Loading
- Check file path is correct
- Verify file format is GLB or GLTF
- Check browser console for errors
- Ensure file size is reasonable (under 10MB)

### Audio Not Playing
- Check browser autoplay policies (audio only plays after user interaction)
- Verify file format is web-compatible
- Check browser console for errors

### PDF Not Displaying
- Verify file is a valid PDF
- Check file path is correct
- Ensure PDF is not password-protected
- Check browser console for errors

## Support

The experience includes:
- Responsive design for all screen sizes
- Graceful fallbacks for missing assets
- Performance optimizations
- Clean, maintainable code structure
- Comprehensive error handling
