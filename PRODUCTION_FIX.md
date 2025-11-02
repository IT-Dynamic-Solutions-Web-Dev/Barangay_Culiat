# Production Deployment Fix

## Problem
Getting `404 (Not Found)` error: `POST https://culiat.onrender.com/api/api/auth/login`

Notice the **double `/api/api`** in the URL - this is wrong.

## Root Cause
The `VITE_API_URL` environment variable in Vercel is set to `https://culiat.onrender.com/api` (with `/api` suffix), but the code already adds `/api` when making requests:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await axios.post(`${API_URL}/api/auth/login`, ...);
```

This results in: `https://culiat.onrender.com/api` + `/api/auth/login` = `https://culiat.onrender.com/api/api/auth/login` ❌

## Solution

### Step 1: Update Vercel Environment Variable

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to **Environment Variables**
4. Update `VITE_API_URL` to:
   ```
   https://culiat.onrender.com
   ```
   ⚠️ **DO NOT include `/api` at the end**

### Step 2: Redeploy

After updating the environment variable, trigger a new deployment:
- Push a commit to trigger auto-deploy, OR
- Go to Vercel dashboard → Deployments → Redeploy

### Expected Result

URLs should now be correctly formatted:
- ✅ `https://culiat.onrender.com/api/auth/login`
- ✅ `https://culiat.onrender.com/api/auth/me`
- ✅ `https://culiat.onrender.com/api/terms/status`
- ✅ `https://culiat.onrender.com/api/document-requests`

## Verification

After redeploying, test the following in production:
1. Login page - should successfully authenticate
2. Registration - should create new users
3. Document requests - should load properly
4. Terms acceptance - should work for new users

## Note

Your local development works fine because:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

The fallback `http://localhost:5000` doesn't have `/api` suffix, so when the code adds `/api`, it becomes `http://localhost:5000/api/auth/login` ✅

## Backend Environment Variables (Render)

Make sure your Render backend also has the correct environment variables:
- `NODE_ENV=production`
- `PORT=5000` (or whatever Render assigns)
- `DB_URI=<your-mongodb-atlas-connection-string>`
- `JWT_SECRET=<your-secret-key>`
- `CORS_ORIGIN=https://your-vercel-app.vercel.app`

## Troubleshooting

If the issue persists after updating environment variables:

1. **Clear Vercel build cache:**
   - Go to Project Settings → General
   - Scroll to "Build & Development Settings"
   - Clear cache and redeploy

2. **Check browser console:**
   - Open DevTools → Network tab
   - Look for the actual URL being called
   - Should NOT contain `/api/api`

3. **Check environment variables are loaded:**
   - Add temporary console.log in your code:
     ```javascript
     console.log('API_URL:', import.meta.env.VITE_API_URL);
     ```
   - Check browser console in production
   - Should show: `https://culiat.onrender.com` (without `/api`)
