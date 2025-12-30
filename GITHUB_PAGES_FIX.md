# GitHub Pages Deployment Fix Guide

## Current Status

✅ Your vite.config.js has the correct base path: `/toDoApp/`
✅ .nojekyll file exists in dist folder
✅ Build process works correctly
⚠️ Need to verify repository name matches base path (case-sensitive!)

## Step-by-Step Fix Instructions

### 1. Verify Repository Name (IMPORTANT - Case Sensitive!)

Your repository URL is: `GunjanRanjan/toDoApp`

- This means the repo name is: `toDoApp` (capital T and D)
- Your vite.config.js has: `base: "/toDoApp/"` ✅ CORRECT

**Action:** Double-check on GitHub that your repository name is exactly `toDoApp` (not `todapp` or `TodoApp`)

---

### 2. Verify GitHub Pages Settings

1. Go to your GitHub repository: `https://github.com/GunjanRanjan/toDoApp`
2. Click **Settings** tab
3. Scroll down to **Pages** (in left sidebar)
4. Under **Source**, select: **Deploy from a branch**
5. Select branch: **gh-pages**
6. Select folder: **/ (root)**
7. Click **Save**
   111

---

### 3. Verify gh-pages Branch Has Correct Files

The `gh-pages` branch should contain:

- `index.html`
- `assets/` folder
- `.nojekyll` file
- `vite.svg` (if used)

**To check/deploy:**

```bash
npm run build
npm run deploy
```

---

### 4. Check GitHub Pages URL

After deployment, your app should be at:

- **URL:** `https://gunjanranjan.github.io/toDoApp/`

⚠️ **Important:** The URL is case-sensitive! It must match your repository name exactly.

---

### 5. Common Issues & Solutions

#### Issue 1: Blank Page

**Possible causes:**

- Repository name mismatch (case sensitivity)
- Base path in vite.config.js doesn't match repo name
- Assets not loading (check browser console for 404 errors)

**Solution:**

- Verify repo name on GitHub matches base path exactly
- Rebuild and redeploy: `npm run build && npm run deploy`

#### Issue 2: 404 Error on All Routes

**Cause:** Base path mismatch

**Solution:** Ensure vite.config.js has:

```javascript
base: "/toDoApp/"; // Must match your repo name exactly
```

#### Issue 3: Assets Not Loading (CSS/JS 404 errors)

**Cause:** Base path in vite.config.js incorrect

**Solution:**

- Check browser console (F12) for exact errors
- Verify base path matches repository name
- Rebuild after changing vite.config.js

#### Issue 4: Page Shows but Styles/JS Don't Work

**Cause:** Missing .nojekyll file

**Solution:**

- .nojekyll should be in `public/` folder (you have it ✅)
- It gets copied to `dist/` during build (verified ✅)

---

### 6. Testing Locally Before Deploying

Test the production build locally:

```bash
npm run build
npm run preview
```

This serves the `dist/` folder locally so you can verify it works before deploying.

---

### 7. Deployment Checklist

Before deploying, ensure:

- [ ] Repository name matches base path in vite.config.js (case-sensitive)
- [ ] `npm run build` completes without errors
- [ ] `dist/` folder contains: index.html, assets/, .nojekyll
- [ ] GitHub Pages is configured to use `gh-pages` branch
- [ ] Deploy using: `npm run deploy`

---

### 8. Verify Deployment

After `npm run deploy`:

1. Wait 1-2 minutes for GitHub Pages to update
2. Visit: `https://gunjanranjan.github.io/toDoApp/`
3. Open browser console (F12) to check for errors
4. If blank, check Network tab for 404 errors

---

## Quick Fix Commands

```bash
# 1. Clean and rebuild
rm -rf dist
npm run build

# 2. Verify build output
ls -la dist/

# 3. Deploy to GitHub Pages
npm run deploy

# 4. Check deployment (wait 1-2 minutes, then visit)
# https://gunjanranjan.github.io/toDoApp/
```

---

## Debugging: Check Browser Console

1. Open your deployed site
2. Press F12 to open Developer Tools
3. Check **Console** tab for JavaScript errors
4. Check **Network** tab for failed requests (404, 500, etc.)
5. Look for red errors - these tell you what's wrong

Common errors you might see:

- `Failed to load resource: 404` → Base path issue
- `Uncaught SyntaxError` → Build issue
- `Cannot find module` → Path resolution issue

---

## Alternative: If Repository Name Doesn't Match

If your repository has a different name/casing, update vite.config.js:

```javascript
// Example: If repo is "todo-app" instead of "toDoApp"
base: "/todo-app/",  // Update this to match your actual repo name
```

Then rebuild and redeploy.
