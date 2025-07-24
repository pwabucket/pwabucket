#!/bin/bash

# Script to commit and push PWA data changes
# Used by GitHub Actions workflow

set -e  # Exit on any error

# Configure git user for GitHub Actions
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"

# Check if PWA data file exists
if [ -f "public/data/pwa-data.json" ]; then
    echo "PWA data file found, proceeding with git operations..."
    
    # Add the PWA data file to staging
    git add public/data/pwa-data.json
    
    # Check if there are any staged changes
    if git diff --staged --quiet; then
        echo "No changes to commit"
        exit 0
    else
        echo "Changes detected, committing and pushing..."
        
        # Commit with timestamp
        git commit -m "Update PWA data collection - $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
        
        # Push changes
        git push
        
        echo "Successfully committed and pushed PWA data changes"
    fi
else
    echo "Error: PWA data file not found at public/data/pwa-data.json"
    exit 1
fi
