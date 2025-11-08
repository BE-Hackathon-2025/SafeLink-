# SafeLink Mesh AI - Running the App Locally

## Quick Start

### 1. Start Metro Bundler
```powershell
cd app
npm start
```

Or use the startup script:
```powershell
.\START_APP.ps1
```

### 2. Run on Device/Emulator

#### Android (Recommended)
1. **Start Android Studio**
   - Open Android Studio
   - Tools → Device Manager
   - Start an Android emulator (or connect a physical device)

2. **Run the app**
   ```powershell
   cd app
   npm run android
   ```
   Or press `a` in the Metro Bundler window

#### iOS (Mac only)
1. **Start Xcode**
   - Open Xcode
   - Xcode → Open Developer Tool → Simulator
   - Start an iOS Simulator

2. **Run the app**
   ```powershell
   cd app
   npm run ios
   ```
   Or press `i` in the Metro Bundler window

#### Physical Device

**Android:**
1. Enable Developer Options on your device
2. Enable USB Debugging
3. Connect device via USB
4. Run: `npm run android`

**iOS:**
1. Connect iPhone/iPad via USB
2. Open Xcode
3. Select your device
4. Run: `npm run ios`

## What You'll See

### On First Launch
- **Onboarding Screen**: 3-slide introduction (Connect, Communicate, Survive)
- Swipe or tap "Next" to navigate
- Tap "Get Started" to continue

### Main Screen (MeshHomeScreen)
- **Mesh Network Status**: Connection status, device count, delivery rate
- **Quick Actions**: 
  - Request help (SOS)
  - Status update
  - Nearby devices
  - Stress test
- **Nearby Devices**: List of connected devices with signal strength
- **Active Alerts & Requests**: Community alerts and relief requests

### Features to Test

1. **Send a Message**
   - Tap "Request help" or "Status update"
   - Enter message text
   - Select priority
   - Tap "Send message"

2. **View Nearby Devices**
   - See devices in "Nearby devices" section
   - Tap "Nearby devices" card for full list
   - Shows signal strength and distance

3. **View Alerts**
   - See active alerts in "Active alerts & requests"
   - Tap an alert to see details
   - Navigate to alert location

4. **Rescue Navigation**
   - Tap an alert card
   - See distance and ETA
   - Tap "Navigate" to open in maps
   - Accept rescue and mark arrival

## Troubleshooting

### Metro Bundler Issues
- **Port 8081 already in use**: Stop other Metro instances
- **Clear cache**: `npm start -- --reset-cache`
- **Rebuild**: Delete `node_modules` and run `npm install`

### Android Issues
- **Device not found**: Enable USB debugging
- **Build failed**: Check Android SDK is installed
- **Gradle errors**: Run `cd android && ./gradlew clean`

### iOS Issues
- **CocoaPods errors**: Run `cd ios && pod install`
- **Simulator not found**: Open Xcode and start Simulator
- **Build errors**: Clean build folder in Xcode

### App Not Loading
- Check Metro Bundler is running
- Verify device/emulator is connected
- Check console for errors
- Try reloading: Shake device → Reload

## Development Mode Features

### Hot Reload
- Changes automatically reload
- Fast Refresh enabled by default
- Shake device to open developer menu

### Debugging
- **Chrome DevTools**: Shake device → Debug
- **React Native Debugger**: Recommended tool
- **Console Logs**: Check Metro Bundler window

### Simulation Mode
- On web/emulator, mesh networking uses simulation
- Mock peer data is shown
- Real BLE/WiFi requires physical device

## Notes

- **Mesh Networking**: Requires physical Android/iOS device for real BLE/WiFi
- **Location**: Requires location permissions for navigation features
- **Offline Mode**: App works without internet (mesh networking only)
- **Web Preview**: Some features limited on web (BLE/WiFi not available)

## Next Steps

1. Test on physical device for real mesh networking
2. Test message sending and receiving
3. Test device discovery
4. Test alert broadcasting
5. Test rescue navigation

Happy testing! 🚀

