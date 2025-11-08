# SafeLink Mesh AI - Web Preview Startup Script
Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   SAFELINK MESH AI - WEB PREVIEW" -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if web-preview directory exists
if (-not (Test-Path "web-preview")) {
    Write-Host "ERROR: web-preview directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root." -ForegroundColor Yellow
    exit 1
}

Set-Location web-preview

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: npm install failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Dependencies already installed." -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host "The app will open at http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start the dev server
npm run dev

