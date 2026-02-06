# ART PORTFOLIO - Production-Ready Website

A professional portfolio website for abstract expressionism artist, featuring visceral texture exploration, kinetic energy documentation, and immersive viewing experiences.

## 🎨 Features

### Core Functionality
- **Hero Section**: Full-screen immersive introduction with compelling narrative
- **Masonry Portfolio Grid**: Responsive layout handling multiple aspect ratios
- **Series Categorization**: Three distinct collections (Interference Code, Neon Noir, Full Spectrum Static)
- **Advanced Lightbox**: Deep zoom with pan functionality for texture exploration
- **Password-Protected Viewing Room**: Exclusive access for serious collectors
- **Contact Form**: Validated inquiries with security measures
- **Newsletter Signup**: Email subscription with validation

### Design System
- **Cyber-Industrial Aesthetic**: Dark mode palette (#121212, #1E1E1E, #FF4500)
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1200px
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and focus states
- **Performance Optimized**: Lazy loading, intersection observers, debounced events

## 🛠 Technology Stack

- **Pure HTML5**: Semantic markup with SEO optimization
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript**: Zero dependencies, ES6+ modules
- **Security**: XSS prevention, CSRF tokens ready, input sanitization

## 📁 Project Structure

```
ART PORTFOLIO/
├── index.html              # Main HTML structure
├── css/
│   ├── main.css           # Core styles & design system
│   └── lightbox.css       # Lightbox modal styles
├── js/
│   ├── main.js            # Core app logic & navigation
│   ├── masonry.js         # Masonry grid handler
│   ├── lightbox.js        # Advanced lightbox with zoom
│   └── forms.js           # Form validation & security
├── assets/
│   ├── portfolio/         # Artwork images (high-res)
│   ├── viewing-room/      # Exclusive collector content
│   ├── hero-image.jpg     # Hero section image
│   ├── artist-photo.jpg   # About section image
│   ├── og-image.jpg       # Open Graph social sharing
│   └── favicon.png        # Site favicon
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Setup Images
Place your artwork images in the `assets/portfolio/` directory:
- Use high-resolution images (minimum 2000px on longest side)
- Optimize images (use tools like ImageOptim, TinyPNG)
- Maintain original aspect ratios
- File naming convention: `[series]-[number].jpg` (e.g., `neon-01.jpg`)

### 2. Update Content
Edit `index.html` to customize:
- Artist name (replace `[Your Name]`)
- Bio text (already provided in About section)
- Instagram link (line 144)
- Hero image alt text

### 3. Configure Portfolio Data
Edit `js/main.js` (line 150+) to add your actual artworks:
```javascript
const portfolioData = {
    'interference-code': [
        { id: 5, title: 'Your Title', image: './assets/portfolio/your-image.jpg', ... }
    ],
    // ... add your works
};
```

### 4. Viewing Room Setup
Edit `js/forms.js` (line 320+) for:
- **Password**: Change default passwords (line 330)
- **Available Works**: Update pricing and details (line 352)
- **Production**: Implement backend authentication (line 344 comment)

### 5. Launch
- **Local Testing**: Open `index.html` in a browser
- **Deployment**: Upload to any static host (Netlify, Vercel, GitHub Pages)

## 🔒 Security Notes

### Current Implementation (Client-Side)
- Input sanitization active
- XSS protection implemented
- Honeypot spam trap included

### Production Recommendations
1. **Viewing Room**: Implement backend authentication (see `forms.js` line 344)
2. **Contact Form**: Connect to secure backend API (see `forms.js` line 90)
3. **Newsletter**: Integrate with email service (Mailchimp, ConvertKit)
4. **HTTPS**: Always deploy with SSL certificate
5. **Rate Limiting**: Implement on backend to prevent abuse

## 📊 SEO Optimization

### Already Implemented
- Semantic HTML5 structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Image alt attributes
- Mobile-responsive design

### Recommended Next Steps
1. **Google Analytics**: Add tracking code to `index.html`
2. **Schema.org**: Add artwork structured data
3. **Sitemap**: Generate `sitemap.xml`
4. **robots.txt**: Configure crawl rules
5. **Page Speed**: Test with Google PageSpeed Insights

## 🎯 Viewing Room Access Codes

Default passwords for testing (CHANGE IN PRODUCTION):
- `collector2026`
- `viewingroom`
- `preview`

## 🖼 Image Requirements

### Portfolio Images
- **Format**: JPG (JPEG) for photos
- **Resolution**: Minimum 2000x2000px
- **File Size**: 200-500KB (optimized)
- **Color Space**: sRGB

### Hero Image
- **Dimensions**: 1920x1080px or larger
- **Focus**: Center-weighted composition
- **Subject**: Use Image 11 (Blue/Grey grid) or Image 5 (Yellow/Brown scrape)

### About/Studio Images
- **Dimensions**: 800x800px minimum
- **Content**: Process photos, artist at work

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Android 90+

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (3-column masonry)
- **Tablet**: 768px - 1199px (2-column masonry)
- **Mobile**: < 768px (1-column masonry, hamburger nav)

## ⚡ Performance Optimizations

- Lazy loading for all images
- Intersection Observer for scroll animations
- Debounced scroll events
- Throttled mousemove events
- CSS containment for isolated components
- Preload critical resources

## 🔧 Customization

### Color Palette
Edit CSS variables in `css/main.css` (line 10-15):
```css
--eerie-black: #121212;      /* Primary background */
--dark-grey: #1E1E1E;        /* Secondary background */
--muted-platinum: #E0E0E0;   /* Text color */
--orange-red: #FF4500;       /* Accent/CTA color */
```

### Typography
Edit font stack in `css/main.css` (line 17-18):
```css
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", ...
--font-display: "Helvetica Neue", Arial, sans-serif;
```

## 📞 Support

For technical issues or questions:
1. Check browser console for errors
2. Verify all image paths are correct
3. Ensure JavaScript files load in correct order
4. Test in multiple browsers

## 📄 License

All artwork images © 2026 [Your Name]. All rights reserved.
Website code is proprietary for portfolio use.

## 🎨 Design Philosophy

This portfolio embodies the **"Imperfect by Design"** aesthetic:
- Tactile > Digital perfection
- Texture > Flatness
- Kinetic energy > Static composition
- Visceral impact > Minimal restraint

---

**Built with precision. Optimized for impact. Ready for collectors.**
