#!/bin/bash

# Deployment script for Bucharest Job Search Website
# Usage: ./deploy.sh [production|staging]

set -e  # Exit on error

echo "=============================================="
echo "  Bucharest Job Search Website Deployment"
echo "=============================================="
echo ""

# Configuration
ENVIRONMENT=${1:-production}
WEBSITE_DIR="/var/www/html"
BACKUP_DIR="/var/backups/website"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "Environment: $ENVIRONMENT"
echo "Target Directory: $WEBSITE_DIR"
echo ""

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo "Please run with sudo: sudo ./deploy.sh"
    exit 1
fi

# Create backup of existing site
echo "📦 Creating backup..."
if [ -d "$WEBSITE_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    tar -czf "$BACKUP_DIR/website_backup_$TIMESTAMP.tar.gz" -C "$WEBSITE_DIR" .
    echo "✅ Backup created: $BACKUP_DIR/website_backup_$TIMESTAMP.tar.gz"
else
    echo "⚠️  No existing website to backup"
fi
echo ""

# Create website directory if it doesn't exist
echo "📁 Preparing directories..."
mkdir -p "$WEBSITE_DIR"
mkdir -p "$WEBSITE_DIR/css"
mkdir -p "$WEBSITE_DIR/js"
mkdir -p "$WEBSITE_DIR/files"
echo "✅ Directories ready"
echo ""

# Copy files
echo "📋 Copying website files..."
cp -v index.html "$WEBSITE_DIR/"
cp -v css/style.css "$WEBSITE_DIR/css/"
cp -v js/*.js "$WEBSITE_DIR/js/"
cp -v files/* "$WEBSITE_DIR/files/"
cp -v README.md "$WEBSITE_DIR/"
echo "✅ Files copied"
echo ""

# Set permissions
echo "🔒 Setting permissions..."
chown -R www-data:www-data "$WEBSITE_DIR"
chmod -R 755 "$WEBSITE_DIR"
chmod 644 "$WEBSITE_DIR/index.html"
chmod 644 "$WEBSITE_DIR/css/"*
chmod 644 "$WEBSITE_DIR/js/"*
chmod 644 "$WEBSITE_DIR/files/"*
echo "✅ Permissions set"
echo ""

# Test web server configuration
echo "🧪 Testing web server..."
if command -v nginx &> /dev/null; then
    echo "Nginx detected"
    nginx -t
    if [ $? -eq 0 ]; then
        systemctl reload nginx
        echo "✅ Nginx reloaded"
    else
        echo "❌ Nginx configuration test failed"
        exit 1
    fi
elif command -v apache2 &> /dev/null; then
    echo "Apache detected"
    apache2ctl configtest
    if [ $? -eq 0 ]; then
        systemctl reload apache2
        echo "✅ Apache reloaded"
    else
        echo "❌ Apache configuration test failed"
        exit 1
    fi
else
    echo "⚠️  No web server detected (nginx or apache2)"
fi
echo ""

# Display status
echo "=============================================="
echo "  ✅ DEPLOYMENT SUCCESSFUL!"
echo "=============================================="
echo ""
echo "📊 Deployment Summary:"
echo "  - Environment: $ENVIRONMENT"
echo "  - Website Dir: $WEBSITE_DIR"
echo "  - Backup: $BACKUP_DIR/website_backup_$TIMESTAMP.tar.gz"
echo "  - Timestamp: $TIMESTAMP"
echo ""
echo "🌐 Your website should now be live!"
echo ""
echo "🔍 Next Steps:"
echo "  1. Visit your website in a browser"
echo "  2. Test all links and downloads"
echo "  3. Test contact form"
echo "  4. Test interactive map"
echo "  5. Test on mobile devices"
echo ""
echo "📝 To rollback if needed:"
echo "  sudo tar -xzf $BACKUP_DIR/website_backup_$TIMESTAMP.tar.gz -C $WEBSITE_DIR"
echo ""
echo "=============================================="
