# SafeLink Command Center Dashboard

React web dashboard for monitoring rescue operations in real-time.

## Features

- 📊 Real-time rescue statistics
- 🗺️ Interactive map with rescue markers
- 📋 Rescue event table
- 🔄 Auto-refresh every 10 seconds
- 🎨 Clean, professional UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend server is running:
```bash
cd ../server
npm start
```

3. Start the dashboard:
```bash
npm run dev
```

The dashboard will open at http://localhost:3001

## Requirements

- Backend server running on http://localhost:4000
- Node.js 18+ installed

## API Endpoints Used

- `GET /api/rescues/stats` - Get rescue statistics
- `GET /api/rescues` - Get all rescue events

