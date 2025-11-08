# SafeLink Mesh AI - Deployment Checklist

## ✅ Pre-Deployment Checklist

### Backend Server (`server/`)

- [x] **Server Configuration**
  - [x] Updated `server/index.js` to use `process.env.PORT`
  - [x] Updated CORS to support production domains
  - [x] Updated server to listen on `0.0.0.0`
  - [x] Added environment variable support

- [x] **Environment Variables**
  - [x] Created `server/env.example` file
  - [x] Documented all required environment variables
  - [x] Verified API keys are loaded from environment

- [x] **Dependencies**
  - [x] Verified `package.json` has all dependencies
  - [x] Tested `npm install` locally
  - [x] Verified `npm start` works locally

### Frontend Dashboard (`safelink-dashboard/`)

- [x] **API Configuration**
  - [x] Created `safelink-dashboard/src/config/api.js`
  - [x] Updated all API files to use centralized config
  - [x] Updated `FindShelter.jsx` to use API config
  - [x] Environment variable support for API URL

- [x] **Build Configuration**
  - [x] Updated `vite.config.js` for production
  - [x] Added build optimizations
  - [x] Configured output directory

- [x] **Environment Variables**
  - [x] Created `safelink-dashboard/env.example` file
  - [x] Documented all required environment variables
  - [x] Verified Firebase configuration

- [x] **Dependencies**
  - [x] Verified `package.json` has all dependencies
  - [x] Tested `npm run build` locally
  - [x] Verified build output in `dist/` folder

### Deployment Files

- [x] **Render Configuration**
  - [x] Created `render.yaml` for automated deployment
  - [x] Created `RENDER_DEPLOYMENT.md` guide
  - [x] Documented deployment steps

## 🚀 Deployment Steps

### Step 1: Prepare Repository

- [ ] Push all changes to GitHub
- [ ] Verify all files are committed
- [ ] Create deployment branch (if needed)

### Step 2: Deploy Backend

- [ ] Create Render account
- [ ] Create new Web Service for backend
- [ ] Connect GitHub repository
- [ ] Configure service settings:
  - [ ] Name: `safelink-api`
  - [ ] Environment: `Node`
  - [ ] Root Directory: `server`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `GEMINI_API_KEY=...`
  - [ ] `GOOGLE_MAPS_KEY=...`
  - [ ] `GOOGLE_API_KEY=...`
  - [ ] `FRONTEND_URL=...` (will update after frontend deployment)
- [ ] Deploy backend
- [ ] Verify health check: `https://safelink-api.onrender.com/health`
- [ ] Copy backend URL

### Step 3: Deploy Frontend

- [ ] Create new Static Site for frontend
- [ ] Connect GitHub repository
- [ ] Configure service settings:
  - [ ] Name: `safelink-dashboard`
  - [ ] Root Directory: `safelink-dashboard`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Publish Directory: `dist`
- [ ] Add environment variables:
  - [ ] `VITE_API_BASE_URL=https://safelink-api.onrender.com`
  - [ ] `VITE_FIREBASE_API_KEY=...`
  - [ ] `VITE_FIREBASE_AUTH_DOMAIN=...`
  - [ ] `VITE_FIREBASE_PROJECT_ID=...`
  - [ ] `VITE_FIREBASE_STORAGE_BUCKET=...`
  - [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID=...`
  - [ ] `VITE_FIREBASE_APP_ID=...`
- [ ] Deploy frontend
- [ ] Verify frontend loads: `https://safelink-dashboard.onrender.com`
- [ ] Copy frontend URL

### Step 4: Update Backend CORS

- [ ] Update backend `FRONTEND_URL` environment variable
- [ ] Set to frontend URL: `https://safelink-dashboard.onrender.com`
- [ ] Redeploy backend

### Step 5: Verify Deployment

- [ ] **Backend Health Check**
  - [ ] Test: `https://safelink-api.onrender.com/health`
  - [ ] Expected: `{"status":"ok","ts":"..."}`

- [ ] **Frontend Loading**
  - [ ] Test: `https://safelink-dashboard.onrender.com`
  - [ ] Expected: Dashboard loads without errors

- [ ] **API Connection**
  - [ ] Open browser console on frontend
  - [ ] Check for API calls to backend
  - [ ] Verify no CORS errors
  - [ ] Check network tab for successful requests

- [ ] **Feature Testing**
  - [ ] Test Dashboard page
  - [ ] Test Find Shelter feature
  - [ ] Test First Aid Guide
  - [ ] Test Relief Feed
  - [ ] Test Donate page
  - [ ] Test Help Requests
  - [ ] Test Nearby Devices

## 🔧 Post-Deployment

### Monitoring

- [ ] Set up log monitoring
- [ ] Monitor error rates
- [ ] Check API response times
- [ ] Monitor service uptime

### Optimization

- [ ] Enable caching (if needed)
- [ ] Optimize bundle size
- [ ] Enable CDN (if using paid plan)
- [ ] Set up monitoring alerts

### Documentation

- [ ] Update README with deployment URLs
- [ ] Document environment variables
- [ ] Create runbook for common issues
- [ ] Update API documentation

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check logs in Render dashboard
   - Verify PORT is set to 10000
   - Check npm start command

2. **CORS errors**
   - Verify FRONTEND_URL is set correctly
   - Check CORS configuration
   - Ensure URLs match exactly

3. **API calls failing**
   - Verify VITE_API_BASE_URL is set
   - Check browser console for errors
   - Verify backend is running

4. **Build failures**
   - Check build logs
   - Verify all dependencies are installed
   - Check for missing environment variables

## 📊 Deployment Status

- **Backend**: ⏳ Not deployed
- **Frontend**: ⏳ Not deployed
- **Health Check**: ⏳ Not tested
- **API Connection**: ⏳ Not tested
- **Features**: ⏳ Not tested

## 🎯 Next Steps

1. Complete deployment steps above
2. Test all features
3. Monitor for issues
4. Optimize performance
5. Set up monitoring

---

**Last Updated**: [Current Date]
**Status**: Ready for Deployment ✅

