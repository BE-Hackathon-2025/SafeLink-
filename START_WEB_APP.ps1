# SafeLink Mesh AI - Web App Startup Script (Chrome)

Write-Host "`n" -NoNewline
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   🌐 SAFELINK MESH AI - WEB APP (CHROME)" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

$appDir = "app"
if (-not (Test-Path $appDir)) {
    Write-Host "❌ Error: $appDir directory not found!" -ForegroundColor Red
    exit 1
}

Set-Location $appDir

# Check if web dependencies are installed
if (-not (Test-Path "node_modules\react-native-web")) {
    Write-Host "Installing web dependencies..." -ForegroundColor Yellow
    npm install react-native-web react-dom webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/preset-env @babel/preset-react --save-dev --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error: Failed to install web dependencies!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Web dependencies installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting web development server..." -ForegroundColor Yellow
Write-Host "  The app will open at http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Chrome should open automatically" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Some features (BLE, WiFi, Maps) will use simulation mode on web." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start webpack dev server
npm run web

