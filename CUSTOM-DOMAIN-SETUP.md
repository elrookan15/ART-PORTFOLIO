# Setting Up Custom Domain: www.J15D.ART

This guide will help you connect your custom domain **www.J15D.ART** to your GitHub Pages portfolio.

---

## 📋 Overview

You currently have:
- ✅ GitHub Pages site: `https://elrookan15.github.io/ART-PORTFOLIO/`
- ✅ Custom domain purchased: `www.J15D.ART`
- ⏳ Need to connect them

---

## 🔧 Step 1: Configure GitHub Pages

### 1.1 Add Custom Domain to GitHub

1. Go to your repository: https://github.com/elrookan15/ART-PORTFOLIO
2. Click **Settings** (top menu)
3. Scroll to **Pages** section (left sidebar)
4. Under **Custom domain**, enter: `www.j15d.art`
5. Click **Save**
6. ✅ Check **Enforce HTTPS** (wait 5-10 minutes if greyed out)

---

## 🌐 Step 2: Configure DNS Settings (At Your Domain Registrar)

You need to add DNS records where you purchased `J15D.ART`.

### Common Registrars:
- **GoDaddy**: DNS Management → DNS Records
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Google Domains**: DNS → Custom records
- **Cloudflare**: DNS → Records

### 2.1 DNS Records to Add

Add these **4 A Records** (for apex domain):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

Add this **CNAME Record** (for www subdomain):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | elrookan15.github.io | 3600 |

### 2.2 Example Configuration (Visual)

```
Type    Name    Value                   TTL
────────────────────────────────────────────────
A       @       185.199.108.153         3600
A       @       185.199.109.153         3600
A       @       185.199.110.153         3600
A       @       185.199.111.153         3600
CNAME   www     elrookan15.github.io    3600
```

---

## ⏱️ Step 3: Wait for DNS Propagation

- **Minimum Wait**: 10-30 minutes
- **Maximum Wait**: 24-48 hours (rare)
- **Typical Wait**: 2-4 hours

### Check DNS Propagation Status:

Visit these tools:
- https://www.whatsmydns.net/#CNAME/www.j15d.art
- https://dnschecker.org/#CNAME/www.j15d.art

You should see `elrookan15.github.io` as the result.

---

## ✅ Step 4: Verify It's Working

Once DNS propagates:

1. Visit: **https://www.j15d.art**
2. You should see your portfolio!
3. Verify HTTPS (padlock icon in browser)
4. Test: **https://j15d.art** (should redirect to www)

---

## 🔒 Step 5: Enable HTTPS (GitHub Pages)

1. Go back to: **Settings → Pages**
2. Check **Enforce HTTPS**
3. If greyed out, wait 10-15 minutes and try again
4. Once enabled, all traffic will be secure (https://)

---

## 📝 Step 6: Update Your Portfolio Links

Once your custom domain is live, update these files:

### Update `index.html`:
- Change Open Graph URLs to www.j15d.art
- Update any hardcoded portfolio links

### Update `certificate-of-authenticity.html`:
- Already updated with www.J15D.ART ✅

### Update `robots.txt`:
Replace sitemap URL:
```
Sitemap: https://www.j15d.art/sitemap.xml
```

### Update `sitemap.xml`:
Replace all URLs with your custom domain:
```xml
<loc>https://www.j15d.art/</loc>
```

---

## 🚨 Troubleshooting

### Issue: "Domain's DNS record could not be retrieved"
**Solution:** DNS not configured yet. Double-check A and CNAME records.

### Issue: "www.j15d.art not loading"
**Solution:** DNS propagation takes time. Wait and check again in 1-2 hours.

### Issue: "HTTPS not available"
**Solution:** Must wait for SSL certificate provisioning (10-30 minutes after DNS works).

### Issue: "ERR_TOO_MANY_REDIRECTS"
**Solution:** Remove any redirect rules at your registrar. Let GitHub handle redirects.

---

## 📊 Quick Checklist

Before you start:
- [ ] Have access to DNS settings for J15D.ART
- [ ] Know your domain registrar login

DNS Configuration:
- [ ] Added 4 A records pointing to GitHub IPs
- [ ] Added CNAME record: www → elrookan15.github.io
- [ ] Saved changes

GitHub Pages:
- [ ] Added custom domain in Settings → Pages
- [ ] Enabled "Enforce HTTPS"
- [ ] Committed CNAME file (auto-created)

Verification:
- [ ] www.j15d.art loads your portfolio
- [ ] HTTPS is working (padlock icon)
- [ ] j15d.art redirects to www.j15d.art

---

## 🎨 Bonus: Update Social Media

Once live, update these:
- ✅ Instagram bio link → www.j15d.art
- ✅ Email signature
- ✅ Business cards
- ✅ Artist statement footer

---

## 📞 Need Help?

If you encounter issues:
1. Check DNS propagation: https://www.whatsmydns.net
2. Verify GitHub Pages status: https://www.githubstatus.com
3. Contact your domain registrar support

---

## 🚀 Final Notes

**Benefits of Custom Domain:**
- Professional appearance
- Easier to remember (J15D.ART vs long GitHub URL)
- Better SEO ranking
- Full control over branding
- Looks more credible to collectors

**After Setup:**
- Your GitHub Pages site will ONLY be accessible via www.j15d.art
- Old GitHub URL will redirect automatically
- All existing links will still work

---

## ⚡ Quick Start Commands

Once domain is working, commit the changes:

```bash
git add .
git commit -m "Add custom domain configuration for www.J15D.ART"
git push
```

GitHub will automatically create a `CNAME` file in your repo with:
```
www.j15d.art
```

---

**Your custom domain setup is ready to go!**

Visit: **https://www.j15d.art** (after DNS propagation)
