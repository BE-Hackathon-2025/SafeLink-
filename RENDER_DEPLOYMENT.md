# SafeLink Mesh AI - Render Deployment Guide

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Push your code to GitHub
3. **API Keys**: 
   - Google Gemini API Key
   - Google Maps API Key
   - Firebase Configuration

## 🚀 Deployment Steps

### Step 1: Deploy Backend API

1. **Go to Render Dashboard** → Click "New +" → Select "Web Service"
2. **Connect Repository**: Connect your GitHub repository
3. **Configure Service**:
   - **Name**: `safelink-api`
   - **Environment**: `Node`
   - **Region**: `Oregon (US West)`
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (or upgrade for better performance)

4. **Environment Variables** (Add these in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_MAPS_KEY=your_google_maps_key
   GOOGLE_API_KEY=your_google_api_key
   FRONTEND_URL=https://safelink-dashboard.onrender.com
   ```

5. **Click "Create Web Service"**
6. **Wait for deployment** (takes 5-10 minutes)
7. **Copy your backend URL** (e.g., `https://safelink-api.onrender.com`)

### Step 2: Deploy Frontend Dashboard

1. **Go to Render Dashboard** → Click "New +" → Select "Static Site"
2. **Connect Repository**: Connect your GitHub repository
3. **Configure Service**:
   - **Name**: `safelink-dashboard`
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `safelink-dashboard`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: `Free`

4. **Environment Variables** (Add these in Render dashboard):
   ```
   VITE_API_BASE_URL=https://safelink-api.onrender.com
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

5. **Click "Create Static Site"**
6. **Wait for deployment** (takes 5-10 minutes)
7. **Copy your frontend URL** (e.g., `https://safelink-dashboard.onrender.com`)

### Step 3: Update Backend CORS

1. **Go to Backend Service** → Environment Variables
2. **Update FRONTEND_URL** to your actual frontend URL:
   ```
   FRONTEND_URL=https://safelink-dashboard.onrender.com
   ```
3. **Redeploy** the backend service

### Step 4: Verify Deployment

1. **Test Backend Health**:
   ```
   https://safelink-api.onrender.com/health
   ```
   Should return: `{"status":"ok","ts":"..."}`

2. **Test Frontend**:
   ```
   https://safelink-dashboard.onrender.com
   ```
   Should load the dashboard

3. **Test API Connection**:
   - Open browser console on frontend
   - Check for API calls to backend
   - Verify no CORS errors

## 🔧 Environment Variables Reference

### Backend (safelink-api)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `10000` (Render default) |
| `GEMINI_API_KEY` | Google Gemini API | `AIza...` |
| `GOOGLE_MAPS_KEY` | Google Maps API | `AIza...` |
| `GOOGLE_API_KEY` | Google API (fallback) | `AIza...` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://safelink-dashboard.onrender.com` |

### Frontend (safelink-dashboard)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://safelink-api.onrender.com` |
| `VITE_FIREBASE_API_KEY` | Firebase API Key | `AIza...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `your-project-id` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage | `project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123:web:abc` |

## 📝 Using render.yaml (Alternative)

If you prefer using `render.yaml`:

1. **Push `render.yaml` to your repository**
2. **Go to Render Dashboard** → "New +" → "Blueprint"
3. **Connect Repository** and select your repository
4. **Render will auto-detect `render.yaml`**
5. **Review configuration** and click "Apply"
6. **Add environment variables** in Render dashboard
7. **Deploy**

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- **Solution**: Check logs in Render dashboard
- **Solution**: Verify `PORT` is set to `10000` (Render default)
- **Solution**: Check `npm start` command in `server/package.json`

**Problem**: CORS errors
- **Solution**: Verify `FRONTEND_URL` is set correctly
- **Solution**: Check CORS configuration in `server/index.js`
- **Solution**: Ensure frontend URL matches exactly (no trailing slash)

**Problem**: API keys not working
- **Solution**: Verify environment variables are set in Render
- **Solution**: Check API key permissions in Google Cloud Console
- **Solution**: Ensure API keys are not expired

### Frontend Issues

**Problem**: Frontend not building
- **Solution**: Check build logs in Render dashboard
- **Solution**: Verify `npm run build` command works locally
- **Solution**: Check for missing dependencies

**Problem**: API calls failing
- **Solution**: Verify `VITE_API_BASE_URL` is set correctly
- **Solution**: Check browser console for errors
- **Solution**: Verify backend is running and accessible

**Problem**: Firebase not working
- **Solution**: Verify all Firebase environment variables are set
- **Solution**: Check Firebase configuration in browser console
- **Solution**: Verify Firebase project settings

### General Issues

**Problem**: Services going to sleep (Free Plan)
- **Solution**: Free plan services sleep after 15 minutes of inactivity
- **Solution**: First request after sleep takes 30-60 seconds to wake up
- **Solution**: Upgrade to paid plan for always-on service

**Problem**: Slow response times
- **Solution**: Free plan has limited resources
- **Solution**: Upgrade to paid plan for better performance
- **Solution**: Optimize your code and reduce bundle size

## 🔄 Updating Deployment

### Update Backend

1. **Push changes to GitHub**
2. **Render automatically detects changes**
3. **Auto-deploys** (or manually trigger in dashboard)
4. **Wait for deployment** to complete

### Update Frontend

1. **Push changes to GitHub**
2. **Render automatically detects changes**
3. **Auto-deploys** (or manually trigger in dashboard)
4. **Wait for deployment** to complete

### Manual Deploy

1. **Go to Service** in Render dashboard
2. **Click "Manual Deploy"**
3. **Select branch and commit**
4. **Click "Deploy"**

## 📊 Monitoring

### Backend Logs

1. **Go to Backend Service** → "Logs" tab
2. **View real-time logs**
3. **Filter by level** (Info, Warning, Error)

### Frontend Logs

1. **Go to Frontend Service** → "Logs" tab
2. **View build logs**
3. **Check for build errors**

### Health Checks

1. **Backend**: `https://safelink-api.onrender.com/health`
2. **Frontend**: Check Render dashboard for deployment status

## 🎯 Best Practices

1. **Use Environment Variables**: Never hardcode API keys
2. **Monitor Logs**: Check logs regularly for errors
3. **Test Locally**: Test changes locally before deploying
4. **Use Branches**: Deploy from specific branches
5. **Backup Data**: Backup important data regularly
6. **Update Dependencies**: Keep dependencies up to date
7. **Optimize Build**: Reduce bundle size for faster deployments

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Render Support**: https://render.com/support
- **SafeLink Issues**: Create issue in GitHub repository

## ✅ Deployment Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] Environment variables set
- [ ] CORS configured correctly
- [ ] API keys working
- [ ] Firebase configured
- [ ] Health checks passing
- [ ] All features tested
- [ ] Logs monitored
- [ ] Documentation updated

---

**Congratulations! Your SafeLink Mesh AI is now deployed on Render! 🎉**

