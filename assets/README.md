# Art Portfolio Website - Assets Directory

This directory contains all images and media assets for your portfolio website.

## 📁 Directory Structure

```
assets/
├── portfolio/           # Main portfolio artwork images
├── viewing-room/        # Exclusive collector-only images
├── hero-image.jpg       # Main hero section background
├── artist-photo.jpg     # Your photo for About section
├── og-image.jpg         # Open Graph image for social sharing
└── favicon.png          # Browser tab icon
```

## 📸 Image Requirements

### Portfolio Images (`portfolio/` folder)
**Purpose:** Main artwork showcased in your portfolio grid

**Specifications:**
- **Format:** JPG (JPEG)
- **Resolution:** Minimum 2000px on longest side
- **File Size:** 200-500KB (optimized)
- **Color Space:** sRGB
- **Aspect Ratio:** Maintain original (masonry grid adapts automatically)

**Naming Convention:**
- Interference Code series: `interference-01.jpg`, `interference-02.jpg`, etc.
- Neon Noir series: `neon-01.jpg`, `neon-04.jpg`, etc.
- Full Spectrum Static series: `spectrum-02.jpg`, `spectrum-06.jpg`, etc.

**Example Files Needed (based on your portfolio plan):**
```
portfolio/
├── interference-05.jpg  (Yellow/Brown scrape)
├── interference-10.jpg  (Blue/Orange shapes)
├── interference-11.jpg  (Blue/Grey grid/glitch)
├── neon-01.jpg          (Purple/Green cosmic)
├── neon-04.jpg          (Black/Multi-color splatter)
├── neon-09.jpg          (Black/Explosion)
├── neon-12.jpg          (Dark splatter)
├── spectrum-02.jpg      (Earthy/Dense)
├── spectrum-06.jpg      (Multi-color density)
├── spectrum-07.jpg      (Bright chaos)
├── spectrum-08.jpg      (Handprint/Symbols)
└── spectrum-13.jpg      (Wide/Panoramic splatter)
```

---

### Viewing Room Images (`viewing-room/` folder)
**Purpose:** Exclusive high-end works for authenticated collectors

**Specifications:**
- Same as portfolio images (JPG, 2000px+, optimized)
- Higher resolution acceptable (these are for serious buyers)
- Include detail shots if desired

**Naming Convention:**
- `vr-01.jpg`, `vr-02.jpg`, `vr-03.jpg`, etc.

---

### Hero Image (`hero-image.jpg`)
**Purpose:** Full-screen background for homepage hero section

**Specifications:**
- **Format:** JPG
- **Dimensions:** 1920x1080px or larger (recommended: 2560x1440px)
- **File Size:** 500KB - 1MB (balanced quality/performance)
- **Subject:** Use your Image 11 (Blue/Grey grid) or Image 5 (Yellow/Brown scrape) as suggested in the brief

**Composition Tips:**
- Center-weighted focus (text overlays the center)
- Not too busy (text needs to be readable)
- Good contrast for white text overlay

---

### Artist Photo (`artist-photo.jpg`)
**Purpose:** About section - shows you in your studio or professional headshot

**Specifications:**
- **Format:** JPG
- **Dimensions:** 800x800px minimum (square or portrait)
- **File Size:** 100-300KB
- **Subject:** You painting, in studio, or professional portrait

---

### Open Graph Image (`og-image.jpg`)
**Purpose:** Image shown when your site is shared on social media (Facebook, Twitter, LinkedIn)

**Specifications:**
- **Format:** JPG
- **Dimensions:** 1200x630px (required by Facebook/Twitter)
- **File Size:** Under 1MB
- **Subject:** Your best representative artwork or logo with site name

**Text Overlay Recommendation:**
- Add your name
- Add tagline: "Visceral Geometry" or "Kinetic Texture Art"

---

### Favicon (`favicon.png`)
**Purpose:** Small icon in browser tab

**Specifications:**
- **Format:** PNG (supports transparency)
- **Dimensions:** 32x32px or 64x64px (square)
- **File Size:** Under 10KB
- **Subject:** Simple logo, initials, or abstract mark

**Design Tips:**
- Must be recognizable at tiny size
- High contrast
- Simple shapes work best

---

## 🎨 Image Optimization Tools

Before uploading, optimize all images to balance quality and performance:

### Online Tools (Free)
- **TinyPNG** (https://tinypng.com) - Excellent compression
- **Squoosh** (https://squoosh.app) - Google's image optimizer
- **Compressor.io** (https://compressor.io) - Bulk compression

### Desktop Apps
- **ImageOptim** (Mac) - Drag-and-drop optimization
- **FileOptimizer** (Windows) - Batch processing
- **XnConvert** (Cross-platform) - Advanced batch editing

---

## 📐 Aspect Ratio Reference

Your masonry grid automatically handles different aspect ratios:
- **Square:** 1:1 (e.g., 2000x2000px)
- **Portrait:** 2:3 or 3:4 (e.g., 2000x3000px)
- **Landscape:** 3:2 or 4:3 (e.g., 3000x2000px)
- **Panoramic:** 2:1 or wider (e.g., 4000x2000px)

Mix aspect ratios for visual interest - the masonry layout will create an organic, gallery-like flow.

---

## ✅ Quick Setup Checklist

1. **Create folders:**
   - [ ] `assets/portfolio/`
   - [ ] `assets/viewing-room/`

2. **Add required images:**
   - [ ] `hero-image.jpg` (1920x1080px+)
   - [ ] `artist-photo.jpg` (800x800px+)
   - [ ] `og-image.jpg` (1200x630px)
   - [ ] `favicon.png` (32x32px or 64x64px)

3. **Add portfolio images:**
   - [ ] Interference Code series (at least 3 images)
   - [ ] Neon Noir series (at least 4 images)
   - [ ] Full Spectrum Static series (at least 5 images)

4. **Add viewing room images:**
   - [ ] Exclusive works (2-5 images)

5. **Optimize all images:**
   - [ ] Compress to recommended file sizes
   - [ ] Verify dimensions
   - [ ] Test loading speed

---

## 🔍 Testing Your Images

After adding images:
1. Open `index.html` in a browser
2. Check that hero image loads
3. Navigate to portfolio section
4. Verify all artwork thumbnails appear
5. Click an image to open lightbox
6. Test zoom and pan functionality
7. Verify image details display correctly

---

## 🚨 Common Issues

**Images Not Showing?**
- Check file paths match exactly (case-sensitive!)
- Verify file extensions are lowercase (`.jpg` not `.JPG`)
- Ensure images are in correct folders
- Open browser console (F12) to see error messages

**Images Too Slow?**
- Compress images more aggressively
- Reduce dimensions if over 3000px
- Use JPG instead of PNG for photos
- Enable lazy loading (already implemented)

**Hero Image Cut Off?**
- Use landscape orientation (wider than tall)
- Ensure important content is center-weighted
- Test at different screen sizes

---

## 💡 Pro Tips

1. **Consistency:** Keep similar lighting/color grading across series
2. **File Naming:** Use lowercase, hyphens (not spaces or underscores)
3. **Backup:** Keep original high-res versions separate
4. **Watermark:** Consider subtle signature on corners (optional)
5. **Detail Shots:** For textured work, include close-ups in viewing room

---

**Need Help?** 
Check the main `README.md` for technical details or `SETUP.html` for the complete guide.

**Ready to Add Images?**
Once this folder is populated, your portfolio is ready to launch! 🚀
