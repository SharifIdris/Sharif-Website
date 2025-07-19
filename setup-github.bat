@echo off
echo Setting up GitHub repository and pushing your website...

:: Set repository URL
set REPO_URL=https://github.com/SharifIdris/Sharif-Website.git

:: Configure Git if not already done
git config --global user.name "Sharif Idris" 2>nul
git config --global user.email "sharifidris8@gmail.com" 2>nul

:: Check if remote origin exists
git remote -v | findstr "origin" > nul
if %errorlevel% equ 0 (
    echo Updating remote origin...
    git remote set-url origin %REPO_URL%
) else (
    echo Adding remote origin...
    git remote add origin %REPO_URL%
)

:: Push to GitHub
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo Success! Your website has been pushed to GitHub.
    echo Next steps:
    echo 1. Go to https://app.netlify.com/start
    echo 2. Select "Deploy with GitHub"
    echo 3. Select your repository: SharifIdris/Sharif-Website
    echo 4. Follow the Netlify setup instructions
) else (
    echo There was an error pushing to GitHub.
    echo Please check your credentials and try again.
    echo You might need to create a personal access token at:
    echo https://github.com/settings/tokens
)

pause