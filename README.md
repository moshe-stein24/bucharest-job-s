# Bucharest Job Search Website

Professional portfolio and job search website for Moshe Stein - Software Engineer seeking opportunities in Bucharest, Romania.

## 🌐 Live Demo

Deploy this website to your Linode server or GitHub Pages to showcase your job search materials.

## 📦 What's Included

- **Professional Portfolio Website** - Single-page responsive design
- **Interactive Company Map** - Leaflet.js map with 20+ tech companies
- **Company Database** - Filterable list of 61+ Bucharest tech companies
- **Downloadable Resources** - CV and Excel database
- **Contact Form** - Direct email integration
- **Mobile Responsive** - Works on all devices

## 🚀 Quick Deployment to Linode

### Option 1: Simple Apache/Nginx Deployment

1. **Upload files to your server:**
   ```bash
   scp -r * username@your-linode-ip:/var/www/html/
   ```

2. **Set proper permissions:**
   ```bash
   ssh username@your-linode-ip
   cd /var/www/html
   sudo chmod -R 755 .
   sudo chown -R www-data:www-data .
   ```

3. **Configure Apache (if using Apache):**
   ```bash
   sudo nano /etc/apache2/sites-available/000-default.conf
   ```
   
   Make sure DocumentRoot points to `/var/www/html`
   
   ```bash
   sudo systemctl restart apache2
   ```

4. **Configure Nginx (if using Nginx):**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```
   
   ```bash
   sudo systemctl restart nginx
   ```

5. **Access your site:**
   ```
   http://your-linode-ip
   ```

### Option 2: Docker Deployment

1. **Create Dockerfile:**
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   ```

2. **Build and run:**
   ```bash
   docker build -t job-search-site .
   docker run -d -p 80:80 job-search-site
   ```

## 🐙 GitHub Pages Deployment

1. **Create a new GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Bucharest job search website"
   git branch -M main
   git remote add origin https://github.com/moshe-stein24/bucharest-jobs.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages
   - Select "main" branch
   - Save

3. **Your site will be live at:**
   ```
   https://moshe-stein24.github.io/bucharest-jobs/
   ```

## 📁 File Structure

```
bucharest-job-search/
├── index.html              # Main website file
├── css/
│   └── style.css          # All styling
├── js/
│   ├── main.js            # Main functionality
│   ├── map.js             # Interactive map
│   └── companies-data.js  # Company database
├── files/
│   ├── Moshe_Stein_CV_2025.docx
│   └── Bucharest_Tech_Companies_Database.xlsx
└── README.md              # This file
```

## 🛠️ Customization

### Update Email Address

The website is already configured with `moshestein24@gmail.com`. To verify or change:

1. **Contact Form** (`index.html` line ~500):
   ```javascript
   const mailtoLink = `mailto:moshestein24@gmail.com?subject=${subject}&body=${body}`;
   ```

2. **Contact Section** (`index.html` line ~450):
   ```html
   <a href="mailto:moshestein24@gmail.com">moshestein24@gmail.com</a>
   ```

3. **Footer** (`index.html` line ~650):
   ```html
   <a href="mailto:moshestein24@gmail.com" title="Email">
   ```

### Add More Companies

Edit `js/companies-data.js` and add new company objects:

```javascript
{
    name: "Company Name",
    type: "Industry Type",
    size: "Employee Count",
    categories: ["tier1", "ai"],
    priority: true,
    location: { lat: 44.xxxx, lng: 26.xxxx },
    // ... more fields
}
```

### Change Colors

Edit `css/style.css` root variables:

```css
:root {
    --primary-color: #1F4E78;
    --secondary-color: #2C5F8D;
    --accent-color: #C00000;
}
```

## 🔧 Local Development

1. **Simple HTTP Server (Python):**
   ```bash
   python3 -m http.server 8000
   ```
   Visit: `http://localhost:8000`

2. **Simple HTTP Server (Node.js):**
   ```bash
   npx http-server
   ```

3. **VS Code Live Server:**
   - Install "Live Server" extension
   - Right-click index.html
   - Select "Open with Live Server"

## 📧 Contact Form Setup

The contact form uses `mailto:` protocol which opens the user's default email client. For production, consider:

### Option A: FormSpree (Recommended - Free)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option B: Email API Service
Use services like:
- SendGrid
- Mailgun
- EmailJS

### Option C: Backend Form Handler
Create a simple PHP or Node.js backend to handle form submissions.

## 🗺️ Map Configuration

The interactive map uses Leaflet.js with OpenStreetMap tiles (free, no API key needed).

**To add more locations:**
1. Find coordinates using Google Maps (right-click → "What's here?")
2. Add to `companies-data.js` with `location: { lat: XX.XXXX, lng: XX.XXXX }`

## 📱 Mobile Responsive

The website is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px-1920px)
- Tablet (768px-1024px)
- Mobile (320px-768px)

## 🌟 Features

✅ Single-page responsive design
✅ Interactive company map with filters
✅ 61+ tech companies database
✅ Downloadable CV and Excel files
✅ Contact form with email integration
✅ Mobile-friendly navigation
✅ Smooth scroll animations
✅ Fast loading (no heavy frameworks)
✅ SEO optimized
✅ Cross-browser compatible

## 📊 SEO Optimization

The site includes:
- Meta descriptions
- Semantic HTML5
- Proper heading hierarchy
- Alt text for images (if added)
- Fast loading time
- Mobile responsive

**To improve SEO further:**
1. Add Google Analytics
2. Submit sitemap to Google Search Console
3. Add structured data (JSON-LD)
4. Optimize images (if added)

## 🔒 Security Considerations

For production deployment:

1. **Enable HTTPS:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

2. **Security Headers (Nginx):**
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-Content-Type-Options "nosniff";
   add_header X-XSS-Protection "1; mode=block";
   ```

3. **Disable directory listing**

## 📈 Analytics Setup (Optional)

### Google Analytics

Add before `</head>` in index.html:

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

## 🐛 Troubleshooting

### Map not loading?
- Check browser console for errors
- Ensure internet connection (loads tiles from OpenStreetMap)
- Verify Leaflet.js CDN is accessible

### Contact form not working?
- Ensure default email client is configured
- Check if `mailto:` links are blocked by browser
- Consider using FormSpree or backend solution

### Files not downloading?
- Check file paths in `files/` directory
- Verify file permissions (755 for directories, 644 for files)

## 🎨 Design Credits

- Icons: Font Awesome
- Map: Leaflet.js + OpenStreetMap
- Fonts: System fonts (Segoe UI)
- Color scheme: Professional blue theme

## 📄 License

This website is created for personal use by Moshe Stein for job search purposes.

## 📞 Support

For questions about this website:
- Email: moshestein24@gmail.com
- GitHub: github.com/moshe-stein24

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Test all links (company websites, email, downloads)
- [ ] Test contact form
- [ ] Test map functionality
- [ ] Test on mobile devices
- [ ] Verify CV and Excel files are downloadable
- [ ] Enable HTTPS
- [ ] Add Google Analytics (optional)
- [ ] Test site speed
- [ ] Verify responsive design
- [ ] Check cross-browser compatibility

## 📝 Updates

To update content:

1. **Update CV:** Replace `files/Moshe_Stein_CV_2025.docx`
2. **Update Companies:** Edit `js/companies-data.js`
3. **Update Contact Info:** Search and replace email addresses
4. **Redeploy:** Upload changes to server

---

**Built with ❤️ for the Bucharest tech job search**

🎯 **Goal:** Land a great software engineering position in Bucharest!

**Last Updated:** October 30, 2025
