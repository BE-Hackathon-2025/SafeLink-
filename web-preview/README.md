# SafeLink Mesh AI - Web Browser Preview

This is a web-compatible preview of the SafeLink Mesh AI mobile app. It allows you to see and test all screens in your web browser before deploying.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd web-preview
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 📱 Features

- ✅ **Onboarding Screen** - 3 slides with swipe gestures
- ✅ **Home Screen** - Main dashboard with connection status
- ✅ **Send Message Screen** - Create and send messages
- ✅ **Peer List Screen** - View connected devices
- ✅ **Stress Test Screen** - Test mesh network performance
- ✅ **Smooth Animations** - Using Framer Motion
- ✅ **Responsive Design** - Mobile-first, works on desktop too
- ✅ **Touch Gestures** - Swipe support for onboarding

## 🎨 What's Included

- All 5 screens from the mobile app
- All UI components (ConnectionStatus, NearbyDevices, MessageCard)
- Animations and transitions
- Navigation between screens
- LocalStorage for onboarding persistence

## 📝 Notes

- This is a **preview/demo** version for web browsers
- Some native features (Bluetooth, WiFi P2P) are simulated
- Data persistence uses localStorage instead of AsyncStorage
- Perfect for demos, presentations, and testing UI/UX

## 🌐 Hosting

You can host this on any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

Just run `npm run build` and upload the `dist` folder!

## 🐛 Troubleshooting

**Port already in use?**
- Change port in `vite.config.js`

**Module not found?**
- Run `npm install` again

**Build errors?**
- Check Node.js version (should be 16+)
- Clear node_modules and reinstall

