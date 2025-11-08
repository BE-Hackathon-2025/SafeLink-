# SafeLink Mesh AI - Project Structure

## 📁 Essential Files for Running the Application

### 🚀 Mobile App (`app/`)
```
app/
├── App.js                    # Main app component
├── index.js                  # Entry point
├── app.json                  # App configuration
├── package.json              # Dependencies
├── babel.config.js           # Babel configuration
├── screens/                  # All screens
│   ├── OnboardingScreen.js
│   ├── MeshHomeScreen.js
│   ├── SendMessageScreen.js
│   ├── PeerListScreen.js
│   └── StressTestScreen.js
├── components/               # UI components
│   ├── ConnectionStatus.js
│   ├── NearbyDevices.js
│   ├── MessageCard.js
│   └── OfflineSyncModal.js
├── services/                 # Business logic
│   ├── mesh/                # Mesh networking
│   ├── storage/             # Data storage
│   └── ...
├── api/                      # API endpoints
├── constants/               # Configuration
├── utils/                   # Utilities
└── hooks/                   # React hooks
```

### 🌐 Web Preview (`web-preview/`)
```
web-preview/
├── src/
│   ├── App.jsx              # Main app
│   ├── main.jsx             # Entry point
│   ├── screens/             # All screens (web version)
│   └── components/          # UI components (web version)
├── index.html
├── vite.config.js
└── package.json
```

### 🖥️ Backend Server (`server/`)
```
server/
├── index.js                 # Server entry point
├── routes/                  # API routes
├── controllers/             # Business logic
├── models/                  # Data models
├── utils/                   # Utilities
└── package.json
```

### 🔧 Shared Services (`services/`)
```
services/
├── ai/                      # AI services
├── crypto/                  # Encryption
└── storage/                 # Storage services
```

## 🚀 How to Run

### Mobile App:
```bash
cd app
npm install
npm start
npm run android  # or ios
```

### Web Preview:
```bash
cd web-preview
npm install
npm run dev
```

### Backend Server:
```bash
cd server
npm install
npm start
```

## 📝 Documentation

- `README.md` - Main project documentation
- `docs/` - Architecture and API documentation
- `ml_models/README.md` - ML models info

## 🗑️ Removed Files

The following were removed as they're not needed to run the app:
- All test files (`app/tests/`, `tests/`)
- Test screens and scripts
- Log files (`*.log`)
- Cache files
- Duplicate files
- Extra documentation files

