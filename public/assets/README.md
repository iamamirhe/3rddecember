# Assets Folder

This folder contains all the assets needed for the sweater experience.

## Required Files

### 1. Sweater 3D Model
- **Filename**: `sweater.glb`
- **Format**: GLB or GLTF
- **Description**: The 3D model of the sweater that will be displayed and animated
- **Recommended**: Ensure the model is optimized for web (under 5MB) and has proper UV mapping for textures

### 2. Background Music
- **Filename**: `background-music.mp3`
- **Format**: MP3 (recommended) or other web-compatible audio formats
- **Description**: The romantic background music that plays during the PDF reveal
- **Notes**:
  - Will loop automatically
  - Volume is set to 60% by default
  - Fades in smoothly over 3 seconds
  - To change the filename or path, modify `src/utils/audioManager.ts` line 6

### 3. PDF Letter
- **Filename**: `letter.pdf`
- **Format**: PDF
- **Description**: The letter/document that appears after the cinematic sequence
- **Notes**:
  - Supports multi-page PDFs with navigation controls
  - Automatically scales to fit the screen
  - To change the filename or path, modify `src/components/PDFViewer.tsx` line 7

## File Structure

```
public/
└── assets/
    ├── sweater.glb          (your 3D model)
    ├── background-music.mp3 (your audio file)
    ├── letter.pdf           (your PDF document)
    └── README.md            (this file)
```

## Customization

If you need to use different filenames or paths:

1. **3D Model**: Pass `modelPath` prop to `<Scene3D>` component in `src/App.tsx`
2. **Audio**: Pass the path to `createAudioManager()` in `src/App.tsx`
3. **PDF**: Pass `pdfUrl` prop to `<PDFViewer>` component in `src/App.tsx`

## Placeholder Behavior

If any asset is missing, the experience includes graceful fallbacks:
- **Missing 3D Model**: A beautiful torus shape placeholder appears
- **Missing Audio**: Experience continues silently without errors
- **Missing PDF**: A romantic placeholder message appears with instructions

## Testing Your Assets

1. Place your files in this folder
2. Ensure filenames match exactly (case-sensitive)
3. Refresh your browser
4. The experience should load all your custom assets
