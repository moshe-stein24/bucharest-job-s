#!/bin/bash

# Quick GitHub Push Script
# Usage: ./push-to-github.sh

echo "=============================================="
echo "  Push to GitHub"
echo "=============================================="
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Not a git repository!"
    echo "Run this script from the website directory"
    exit 1
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo "⚙️  Setting up GitHub remote..."
    echo "Enter your GitHub repository URL:"
    echo "Example: https://github.com/moshe-stein24/bucharest-job-search.git"
    read -p "URL: " repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote added"
    echo ""
fi

# Show current status
echo "📊 Current status:"
git status --short
echo ""

# Ask for commit message
read -p "Enter commit message (or press Enter for default): " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update website content - $(date +%Y-%m-%d)"
fi

# Add all changes
echo "📦 Adding changes..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "$commit_msg"

# Push
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=============================================="
    echo "  ✅ SUCCESS!"
    echo "=============================================="
    echo ""
    echo "Your changes are now on GitHub!"
    echo ""
    echo "View at:"
    echo "  Repository: https://github.com/moshe-stein24/bucharest-job-search"
    echo "  Live Site:  https://moshe-stein24.github.io/bucharest-job-search/"
    echo ""
    echo "Note: GitHub Pages may take 1-2 minutes to update"
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Common issues:"
    echo "  1. Need to authenticate with Personal Access Token"
    echo "  2. Repository doesn't exist yet"
    echo "  3. No internet connection"
    echo ""
    echo "Check DEPLOYMENT_GUIDE.md for help"
fi
