# Quick Reference Guide

## 🚀 Essential File Locations

### Files You MUST Edit:
1. **index.html** - Replace `[Your Name]` and update Instagram URL
2. **js/main.js** (line 150) - Add your portfolio data
3. **js/forms.js** (line 330) - Change viewing room passwords
4. **assets/** - Add all your images

### Files You DON'T Edit:
- All CSS files (unless customizing colors)
- js/masonry.js and js/lightbox.js (core functionality)
- README.md and DEPLOYMENT.md (documentation)

---

## 🎨 Default Passwords (Change These!)

**Viewing Room Access:**
- `collector2026`
- `viewingroom`  
- `preview`

**Where to change:** `js/forms.js` line 330

---

## 🎯 Portfolio Data Template

Copy this template when adding artworks in `js/main.js`:

```javascript
{
    id: 1,                                    // Unique number
    title: 'Your Artwork Title',             // Full title
    image: './assets/portfolio/your-file.jpg', // File path
    dimensions: '24x36"',                    // Canvas size
    medium: 'Acrylic on Canvas',             // Medium used
    year: 2026,                              // Year created
    series: 'neon-noir',                     // Series name
    description: 'Optional description'      // Optional
}
```

---

## 🌈 Color Palette (Cyber-Industrial)

```css
Background:     #121212 (Eerie Black)
Cards/Sections: #1E1E1E (Dark Grey)
Text:           #E0E0E0 (Muted Platinum)
Accent/CTA:     #FF4500 (Orange Red)
Success:        #00FF88 (Neon Green)
```

**Where to change:** `css/main.css` lines 10-15

---

## 📱 Responsive Breakpoints

- **Mobile:**    < 768px  (1 column masonry)
- **Tablet:**    768-1199px (2 column masonry)
- **Desktop:**   1200px+ (3 column masonry)

---

## 🔧 Common Customizations

### Change Hero Headline:
**File:** `index.html` line 55  
**Current:** "Visceral Geometry"  
**Options:** 
- "Analog Glitch. Kinetic Texture."
- "Layered Topography"

### Change CTA Button Text:
**File:** `index.html` line 57  
**Current:** "Explore Collection"

### Add Google Analytics:
**File:** `index.html` line 21 (before `</head>`)  
**Code:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Change Navigation Logo:
**File:** `index.html` line 32  
**Current:** `[YOUR NAME]`  
**Can be:** Your actual name, initials, or logo text

---

## 📊 SEO Quick Setup

### Update Meta Tags:
**File:** `index.html` lines 8-10

Replace:
```html
<title>[Your Name] | Abstract Expressionism & Kinetic Texture Art</title>
<meta name="description" content="Explore the portfolio of [Your Name]...">
```

With your actual name.

### Add Schema.org Markup:
Add before `</body>` in `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  "name": "Your Portfolio Name",
  "creator": {
    "@type": "Person",
    "name": "Your Name"
  },
  "artform": "Abstract Expressionism",
  "url": "https://yoursite.com"
}
</script>
```

---

## 🖼️ Image Optimization Cheat Sheet

| Image Type | Dimensions | File Size | Format |
|-----------|------------|-----------|--------|
| Portfolio | 2000px+ | 200-500KB | JPG |
| Hero | 1920x1080px | 500KB-1MB | JPG |
| Artist Photo | 800x800px | 100-300KB | JPG |
| OG Image | 1200x630px | <1MB | JPG |
| Favicon | 32x32px | <10KB | PNG |

**Tools:** TinyPNG, Squoosh, ImageOptim

---

## 🔐 Security Checklist

Before launch:
- [ ] Changed viewing room passwords
- [ ] Removed console.log statements
- [ ] Connected backend APIs for forms
- [ ] Enabled HTTPS on hosting
- [ ] Added rate limiting (if using backend)
- [ ] Validated all input fields work
- [ ] Tested XSS protection

---

## 🐛 Debugging Commands

Open browser console (F12) and run:

```javascript
// Check if portfolio data loaded
console.log(window.portfolioItems);

// Check lightbox manager
console.log(window.lightboxManager);

// Check masonry grid
console.log(window.masonryGrid);

// Test viewing room auth
sessionStorage.getItem('viewingRoomAuth');
```

---

## 📞 Form Integration Examples

### Contact Form with Formspree (Easy):

**File:** `js/forms.js` line 90

Replace `submitToAPI` method:

```javascript
async submitToAPI(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}
```

### Newsletter with Mailchimp:

**File:** `js/forms.js` line 226

```javascript
async subscribeToNewsletter(email) {
    const response = await fetch('YOUR_MAILCHIMP_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return await response.json();
}
```

---

## ⌨️ Keyboard Shortcuts (For Users)

When lightbox is open:
- **ESC** - Close lightbox
- **←** - Previous image
- **→** - Next image
- **Z** - Toggle zoom

---

## 🎯 Series Name Reference

Use these exact values in your portfolio data:

```javascript
'interference-code'        // Series 1
'neon-noir'               // Series 2
'full-spectrum-static'    // Series 3
```

**DO NOT** use spaces or capitals - filtering won't work!

---

## 📦 Deployment Commands

### Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages:
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```
Then enable Pages in repo settings.

---

## 🆘 Emergency Fixes

### Images not loading?
1. Check console (F12) for 404 errors
2. Verify file paths are correct
3. Ensure files exist in `assets/` folders
4. Check spelling (case-sensitive!)

### Lightbox won't open?
1. Check `js/main.js` has correct portfolio data
2. Verify all JS files load (check Network tab)
3. Look for JavaScript errors in console

### Forms not submitting?
1. They're set to console.log by default
2. Connect to your backend API
3. Check `js/forms.js` comments for integration

### Mobile menu stuck?
1. Click toggle button again
2. Refresh page
3. Check CSS loaded correctly

---

## 📈 Performance Targets

Run Google PageSpeed Insights - aim for:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

---

## 🎨 Suggested Artwork Counts

- **Interference Code:** 3-5 pieces
- **Neon Noir:** 4-6 pieces  
- **Full Spectrum Static:** 5-8 pieces
- **Viewing Room:** 2-4 exclusive pieces

**Total recommended:** 12-20 works for launch

---

## 🔗 Useful Links

- **TinyPNG:** https://tinypng.com
- **Squoosh:** https://squoosh.app
- **PageSpeed Insights:** https://pagespeed.web.dev
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **HTML Validator:** https://validator.w3.org
- **Formspree (Forms):** https://formspree.io
- **Mailchimp (Newsletter):** https://mailchimp.com
- **Netlify (Hosting):** https://netlify.com
- **Vercel (Hosting):** https://vercel.com

---

**Next Steps:**
1. Open `SETUP.html` in browser for detailed walkthrough
2. Add your images to `assets/` folders
3. Edit `js/main.js` with portfolio data
4. Test locally by opening `index.html`
5. Review `DEPLOYMENT.md` before launch

**Good luck with your launch! 🚀**
