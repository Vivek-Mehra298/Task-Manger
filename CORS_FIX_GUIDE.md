# CORS & Environment Variable Troubleshooting

## Problem You're Experiencing

Your Vercel frontend is trying to call `http://localhost:5000` instead of your deployed Render backend `https://task-manger-nzp1.onrender.com/api`.

This error appears:
```
Access to XMLHttpRequest at 'http://localhost:5000/api/auth/register' from origin 
'https://task-manger-bice-ten.vercel.app' has been blocked by CORS policy
```

## Root Cause

The `NEXT_PUBLIC_API_URL` environment variable is **not set** on Vercel, so it's defaulting to `http://localhost:5000/api`.

## ✅ Step-by-Step Fix

### Step 1: Check Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Click on your project **task-manger**
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)

### Step 2: Add the API URL

1. In the "Environment Variables" page, add a **new** variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://task-manger-nzp1.onrender.com/api`
   - **Environments**: Select **Production**, **Preview**, and **Development**

2. Click **Save**

Example screenshot location: Settings → Environment Variables → Add New

### Step 3: Redeploy Your Frontend

**IMPORTANT:** Just adding the variable isn't enough. You need to **redeploy** your project.

1. Go to your Vercel project
2. Click **Deployments** (top menu)
3. Click the **⋮** (three dots) on your latest deployment
4. Select **Redeploy**
5. Wait for the build to complete (look for the green checkmark)

### Step 4: Verify It Worked

1. Open your frontend in an **incognito/private** window: https://task-manger-bice-ten.vercel.app
2. Open DevTools (F12)
3. Go to **Console** tab
4. Look for: `🔗 API URL: https://task-manger-nzp1.onrender.com/api`
5. If you see this, the environment variable is working!

## 🔍 Debugging Tips

### If you still see `localhost:5000` in console:

1. **Hard refresh** your browser:
   - **Windows/Linux**: `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`

2. **Check Network tab in DevTools**:
   - F12 → Network tab
   - Try to sign up
   - Look at the request URL - it should be `https://task-manger-nzp1.onrender.com/api/auth/register`

3. **Check Vercel deployment logs**:
   - Go to Deployments
   - Click on the latest deployment
   - Click **Function Logs** or **Runtime Logs**
   - Look for any errors during build

### If requests are going to localhost but you set the variable:

This usually means:
- **Your Vercel build didn't update** - Try redeploying
- **Browser cache** - Hard refresh or use incognito
- **Old build was deployed** - Check deployment timestamp

## 📋 Environment Variables Checklist

Make sure these are set on Vercel:

- ✅ `NEXT_PUBLIC_API_URL=https://task-manger-nzp1.onrender.com/api`
- ✅ Set for **Production** environment
- ✅ Project is **redeployed** after adding the variable
- ✅ Using **https** (not http) for the Render URL
- ✅ No trailing/leading spaces in the value

## Common Mistakes

❌ **Wrong**: `http://task-manger-nzp1.onrender.com/api` (http instead of https)  
✅ **Correct**: `https://task-manger-nzp1.onrender.com/api`

❌ **Wrong**: `https://task-manger-nzp1.onrender.com` (missing `/api`)  
✅ **Correct**: `https://task-manger-nzp1.onrender.com/api`

❌ **Wrong**: Only set for "Development" environment  
✅ **Correct**: Set for "Production" and "Preview" too

## After This Works

1. You should be able to **sign up** without CORS errors
2. The signup request will go to Render backend
3. Data will be saved to MongoDB Atlas
4. Login will work
5. Projects and tasks will sync with your database

## Still Having Issues?

Check Render backend logs:
1. Go to https://dashboard.render.com
2. Click your backend service
3. Go to **Logs** tab
4. Look for any errors when requests come in
5. Verify `NODE_ENV=production` is set

Check MongoDB Atlas:
1. Verify your connection string is correct in Render `.env`
2. Make sure your IP address is whitelisted in MongoDB Atlas Network Access
