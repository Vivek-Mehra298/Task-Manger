# Production Integration Guide

This guide helps you connect your deployed services (Render backend, Vercel frontend, MongoDB Atlas database).

## Current Setup

- **Backend (API)**: https://task-manger-nzp1.onrender.com
- **Frontend**: https://task-manger-bice-ten.vercel.app
- **Database**: MongoDB Atlas

## Step 1: Update Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project `task-manger`
3. Go to **Settings** → **Environment Variables**
4. Add this variable:
   ```
   NEXT_PUBLIC_API_URL=https://task-manger-nzp1.onrender.com/api
   ```
5. Make sure it's enabled for **Production** environment
6. Click **Save**
7. **Redeploy** your frontend from Vercel dashboard

## Step 2: Update Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Environment** tab
4. Add/Update these variables:
   ```
   CLIENT_URL=https://task-manger-bice-ten.vercel.app
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://vivekdehariya298_db_user:wBg0LPE0V7uWcwvv@cluster0.stay0xw.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_secure_jwt_secret_here
   ```
5. Click **Save Changes**
6. Your backend will automatically redeploy

## Step 3: Verify Database Connection (MongoDB Atlas)

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Go to your cluster settings
3. Verify the connection string in your `.env` is correct:
   ```
   MONGODB_URI=mongodb+srv://vivekdehariya298_db_user:wBg0LPE0V7uWcwvv@cluster0.stay0xw.mongodb.net/?appName=Cluster0
   ```

## Testing the Connection

### Test Backend is Running
```bash
curl https://task-manger-nzp1.onrender.com/api/auth
# Should return an error or valid response, not a 404
```

### Test Frontend to Backend
1. Open your frontend: https://task-manger-bice-ten.vercel.app
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Try to login or perform an action
5. Check network requests - they should go to `task-manger-nzp1.onrender.com/api`

### Check Console Errors
- Look in the **Console** tab for CORS errors
- Look for any API errors that show the request URL

## Troubleshooting

### "CORS error" or "Failed to fetch"

**Solution:**
1. Verify `NEXT_PUBLIC_API_URL` is set correctly on Vercel
2. Check backend CORS configuration in `server/src/index.ts`
3. Ensure Render backend environment variables are set
4. Redeploy both services after changing environment variables

### API returns 404 or "Cannot GET"

**Solution:**
- Backend might not be running on Render
- Check Render dashboard logs for errors
- Make sure `PORT` environment variable is set in Render
- Verify the backend service is deployed and active

### Database connection fails

**Solution:**
- Verify `MONGODB_URI` is correct in Render environment
- Check MongoDB Atlas Network Access allows Render's IP
- Ensure MongoDB Atlas cluster is active

## Redeploying After Changes

### After changing Vercel environment variables:
```
1. Go to Vercel Dashboard
2. Click your project
3. Go to Deployments
4. Click the three-dot menu on the latest deployment
5. Select "Redeploy"
```

### After changing Render environment variables:
- Changes auto-deploy when you save
- Check the Render dashboard for deployment status

## API Routes Available

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [MongoDB Atlas Connection Guide](https://docs.atlas.mongodb.com/driver-connection)
