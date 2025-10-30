# 🚀 DEPLOYMENT GUIDE - Bucharest Job Search Website

## Complete Step-by-Step Instructions

---

## PART 1: PUSH TO GITHUB (Make it Public)

### Step 1: Create GitHub Repository

1. Go to https://github.com/moshe-stein24
2. Click the **"+" icon** in top right → **"New repository"**
3. Fill in details:
   - **Repository name:** `bucharest-job-search` (or any name you prefer)
   - **Description:** "Professional job search website for Bucharest tech opportunities"
   - **Visibility:** ✅ **PUBLIC** (very important!)
   - ❌ **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Copy these commands and run them IN THE WEBSITE DIRECTORY:

```bash
cd /home/claude/job_search_website

# Add GitHub remote (replace URL with YOUR repository URL)
git remote add origin https://github.com/moshe-stein24/bucharest-job-search.git

# Push to GitHub
git push -u origin main
```

**Important:** You'll need to authenticate. GitHub will ask for:
- **Username:** moshe-stein24
- **Password:** Use a **Personal Access Token** (not your regular password)

#### How to Create a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: "Website Deployment"
4. Select scopes: ✅ **repo** (full control)
5. Click **"Generate token"**
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
7. Use this token as your password when pushing

### Step 3: Verify Upload

1. Go to your GitHub repository: `https://github.com/moshe-stein24/bucharest-job-search`
2. You should see all your files!
3. Repository is now **PUBLIC** - anyone can view it ✅

---

## PART 2: ENABLE GITHUB PAGES (FREE HOSTING!)

### Option A: Host on GitHub Pages (Easiest - FREE!)

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Click **"Pages"** (left sidebar)
4. Under "Source":
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**
6. Wait 1-2 minutes for deployment
7. Your site will be live at:
   ```
   https://moshe-stein24.github.io/bucharest-job-search/
   ```

**That's it! Your website is now live and public!** 🎉

---

## PART 3: DEPLOY TO LINODE SERVER (Optional)

### Prerequisites

You need:
- Linode server IP address
- SSH access (username and password/key)
- Web server installed (Apache or Nginx)

### Step 1: Connect to Linode

```bash
ssh your-username@your-linode-ip
```

### Step 2: Install Web Server (if not installed)

**For Nginx:**
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

**For Apache:**
```bash
sudo apt update
sudo apt install apache2 -y
sudo systemctl start apache2
sudo systemctl enable apache2
```

### Step 3: Upload Website Files

**Option A: Using Git (Recommended)**
```bash
# On your Linode server
cd /var/www/html
sudo rm -rf *  # Remove default files
sudo git clone https://github.com/moshe-stein24/bucharest-job-search.git .
```

**Option B: Using SCP (from your local machine)**
```bash
cd /home/claude/job_search_website
scp -r * your-username@your-linode-ip:/var/www/html/
```

### Step 4: Set Permissions

```bash
# On your Linode server
cd /var/www/html
sudo chown -R www-data:www-data .
sudo chmod -R 755 .
```

### Step 5: Test Website

Open in browser: `http://your-linode-ip`

Your website should now be live!

---

## PART 4: ADD CUSTOM DOMAIN (Optional)

### If You Have a Domain Name:

1. **Update DNS Records** (at your domain registrar):
   ```
   Type: A
   Name: @
   Value: YOUR_LINODE_IP
   ```

2. **Configure Nginx** (if using Nginx):
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
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

3. **Enable HTTPS (Free with Let's Encrypt)**:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

---

## QUICK REFERENCE COMMANDS

### Update Website (after making changes)

**On GitHub:**
```bash
cd /home/claude/job_search_website
git add .
git commit -m "Update: describe your changes"
git push origin main
```

**On Linode:**
```bash
cd /var/www/html
sudo git pull origin main
```

---

## TROUBLESHOOTING

### Problem: Can't push to GitHub
**Solution:** Make sure you're using a Personal Access Token, not your password

### Problem: GitHub Pages not working
**Solution:** 
1. Check Settings → Pages → Ensure "main" branch is selected
2. Wait 2-3 minutes for deployment
3. Check repository is PUBLIC

### Problem: Website shows directory listing on Linode
**Solution:** Ensure `index.html` is in `/var/www/html/` root

### Problem: Map not loading
**Solution:** Check browser console for errors. Ensure internet connection.

### Problem: Permission denied on Linode
**Solution:** 
```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

---

## WHAT YOU'LL HAVE AFTER DEPLOYMENT

✅ **GitHub Repository** (public): 
   - https://github.com/moshe-stein24/bucharest-job-search
   - Anyone can view your code and files

✅ **Live Website** (GitHub Pages):
   - https://moshe-stein24.github.io/bucharest-job-search/
   - FREE hosting
   - Automatic updates when you push to GitHub

✅ **Optional: Linode Server**:
   - http://your-linode-ip
   - Full control over hosting
   - Can add custom domain

---

## FILES INCLUDED IN YOUR WEBSITE

📄 **index.html** - Main website
🎨 **css/style.css** - All styling
⚙️ **js/main.js** - Website functionality
⚙️ **js/map.js** - Interactive map
📊 **js/companies-data.js** - Company database
📥 **files/Moshe_Stein_CV_2025.docx** - Your CV
📥 **files/Bucharest_Tech_Companies_Database.xlsx** - Company spreadsheet
📖 **README.md** - Documentation
🚀 **deploy.sh** - Deployment script

---

## NEXT STEPS AFTER DEPLOYMENT

1. ✅ Visit your live site and test everything
2. ✅ Share the URL with potential employers
3. ✅ Add the URL to your CV and email signature
4. ✅ Share on LinkedIn
5. ✅ Update content as needed (git push to update)

---

## YOUR LIVE URLS

**GitHub Repository (Public):**
```
https://github.com/moshe-stein24/bucharest-job-search
```

**Live Website (GitHub Pages):**
```
https://moshe-stein24.github.io/bucharest-job-search/
```

**Linode (if deployed):**
```
http://your-linode-ip
```

---

## SUPPORT

Need help? Check:
- GitHub docs: https://docs.github.com/pages
- Nginx docs: https://nginx.org/en/docs/
- Apache docs: https://httpd.apache.org/docs/

---

**🎉 Congratulations! Your job search website is now live and public!**

Share it with everyone and good luck with your Bucharest job search! 💪
