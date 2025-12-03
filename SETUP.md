# Setup Checklist

Follow these steps to get your romantic sweater experience running.

## Prerequisites

- **Node.js** 18+ installed ([Download here](https://nodejs.org/))
- Your three asset files ready:
  - 3D sweater model (GLB/GLTF format)
  - Background music (MP3 recommended)
  - PDF letter/document

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

**Expected output**: Should install ~290 packages without errors

---

### 2. Add Your Assets

Create your assets folder if it doesn't exist:
```bash
mkdir -p public/assets
```

Copy your files to the assets folder with these exact names:
- `public/assets/sweater.glb`
- `public/assets/background-music.mp3`
- `public/assets/letter.pdf`

**On macOS/Linux:**
```bash
cp /path/to/your/model.glb public/assets/sweater.glb
cp /path/to/your/music.mp3 public/assets/background-music.mp3
cp /path/to/your/letter.pdf public/assets/letter.pdf
```

**On Windows:**
```cmd
copy C:\path\to\your\model.glb public\assets\sweater.glb
copy C:\path\to\your\music.mp3 public\assets\background-music.mp3
copy C:\path\to\your\letter.pdf public\assets\letter.pdf
```

**Or simply:** Drag and drop the files into `public/assets/` folder

---

### 3. Test Locally

Start the development server:
```bash
npm run dev
```

**Expected output:**
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

Open your browser to: **http://localhost:5173**

---

### 4. Verify Everything Works

**You should see:**
1. A loading screen briefly
2. Your 3D sweater model (or a placeholder torus if model is missing)
3. The text: "I still remember... 3rd of December"
4. A "REMEMBER" button

**Click the button and verify:**
1. Sweater rotates and opens
2. Camera zooms forward
3. Screen fades to black
4. PDF appears (or placeholder message)
5. Music starts playing (after interaction)

---

## Quick Troubleshooting

### If the 3D model doesn't appear:
- ✅ Check the file is at: `public/assets/sweater.glb`
- ✅ File format is GLB or GLTF
- ✅ File size is reasonable (under 20MB)
- ✅ Placeholder should show if file is missing

### If music doesn't play:
- ✅ Check the file is at: `public/assets/background-music.mp3`
- ✅ You clicked the button (required for autoplay)
- ✅ Volume is turned up
- ✅ Browser allows audio playback

### If PDF doesn't appear:
- ✅ Check the file is at: `public/assets/letter.pdf`
- ✅ PDF is not password-protected
- ✅ File is a valid PDF format
- ✅ Placeholder message should show if file is missing

### If you see errors in terminal:
- ✅ Run `npm install` again
- ✅ Delete `node_modules` and run `npm install`
- ✅ Check Node.js version: `node --version` (should be 18+)

---

## Next Steps

### Everything Working?

1. **Customize the text** (see `ASSET_CONFIGURATION.md`)
2. **Adjust animations** (see `ASSET_CONFIGURATION.md`)
3. **Change colors/styling** (see `ASSET_CONFIGURATION.md`)

### Ready to Deploy?

See `DEPLOYMENT.md` for:
- Building for production
- Deploying to Vercel, Netlify, or other hosting
- Performance optimization tips

---

## File Checklist

Before deployment, verify these files exist:

```
✓ public/assets/sweater.glb
✓ public/assets/background-music.mp3
✓ public/assets/letter.pdf
```

---

## Common Customizations

### Change the text:
**File:** `src/components/Overlay.tsx` (lines 12-14)

### Change button text:
**File:** `src/components/Overlay.tsx` (line 22)

### Change animation speed:
**File:** `src/utils/animations.ts` (adjust duration values)

### Change colors:
**File:** `src/components/Scene3D.tsx` (background, lights)

### Use different filenames:
**File:** `src/App.tsx` (pass custom paths as props)

See `ASSET_CONFIGURATION.md` for detailed instructions.

---

## Need Help?

1. **Check browser console** (F12 → Console tab) for error messages
2. **Read the documentation**:
   - `README.md` - Project overview
   - `ASSET_CONFIGURATION.md` - Customization guide
   - `DEPLOYMENT.md` - Deployment instructions
   - `public/assets/README.md` - Asset requirements
3. **Verify all assets** are in the correct location with correct names

---

## Quick Start Summary

```bash
# 1. Install
npm install

# 2. Add your 3 files to public/assets/
#    - sweater.glb
#    - background-music.mp3
#    - letter.pdf

# 3. Run
npm run dev

# 4. Open browser to http://localhost:5173

# 5. Click "REMEMBER" button and enjoy!
```

---

**That's it!** Your romantic sweater experience is ready to share.

When ready to deploy:
```bash
npm run build
```

Then upload the `dist/` folder to your hosting service.
