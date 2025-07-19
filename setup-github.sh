#!/bin/bash

echo "Setting up GitHub repository and pushing your website..."

# Set repository URL
REPO_URL="https://github.com/SharifIdris/Sharif-Website.git"

# Configure Git if not already done
git config --global user.name "Sharif Idris" 2>/dev/null
git config --global user.email "sharifidris8@gmail.com" 2>/dev/null

# Check if remote origin exists
if git remote | grep -q "origin"; then
    echo "Updating remote origin..."
    git remote set-url origin $REPO_URL
else
    echo "Adding remote origin..."
    git remote add origin $REPO_URL
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "Success! Your website has been pushed to GitHub."
    echo "Next steps:"
    echo "1. Go to https://app.netlify.com/start"
    echo "2. Select 'Deploy with GitHub'"
    echo "3. Select your repository: SharifIdris/Sharif-Website"
    echo "4. Follow the Netlify setup instructions"
else
    echo "There was an error pushing to GitHub."
    echo "Please check your credentials and try again."
    echo "You might need to create a personal access token at:"
    echo "https://github.com/settings/tokens"
fi

read -p "Press Enter to continue..."