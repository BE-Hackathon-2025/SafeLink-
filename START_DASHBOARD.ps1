# SafeLink Dashboard - Complete Startup Script

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   🌐 SAFELINK DASHBOARD STARTUP" -ForegroundColor Yellow
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# Stop any existing processes on ports 4000 and 5173
Write-Host "Checking for existing processes..." -ForegroundColor Yellow

if (Test-Port -Port 4000) {
    Write-Host "  ⚠️  Port 4000 is in use. Stopping existing process..." -ForegroundColor Yellow
    $process = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}

if (Test-Port -Port 5173) {
    Write-Host "  ⚠️  Port 5173 is in use. Stopping existing process..." -ForegroundColor Yellow
    $process = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}

Write-Host ""

# Start backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
$backendScript = @"
cd 'C:\Users\HP\GRAM-TEAMB\server'
Write-Host '`n[Backend Server]' -ForegroundColor Green
Write-Host 'Starting on http://localhost:4000...' -ForegroundColor Cyan
Write-Host ''
npm start
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript -WindowStyle Normal
Start-Sleep -Seconds 3

# Wait for backend to be ready
Write-Host "Waiting for backend server to start..." -ForegroundColor Yellow
$maxAttempts = 10
$attempt = 0
$backendReady = $false

while ($attempt -lt $maxAttempts) {
    Start-Sleep -Seconds 2
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4000/api/rescues/stats" -TimeoutSec 2 -ErrorAction Stop
        $backendReady = $true
        Write-Host "  ✅ Backend server is ready!" -ForegroundColor Green
        break
    } catch {
        $attempt++
        Write-Host "  ⏳ Waiting... ($attempt/$maxAttempts)" -ForegroundColor Gray
    }
}

if (-not $backendReady) {
    Write-Host "  ⚠️  Backend server may not be ready yet. Continuing anyway..." -ForegroundColor Yellow
}

Write-Host ""

# Start dashboard
Write-Host "Starting dashboard..." -ForegroundColor Yellow
$dashboardScript = @"
cd 'C:\Users\HP\GRAM-TEAMB\safelink-dashboard'
Write-Host '`n[Dashboard Server]' -ForegroundColor Green
Write-Host 'Starting on http://localhost:5173...' -ForegroundColor Cyan
Write-Host ''
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $dashboardScript -WindowStyle Normal
Start-Sleep -Seconds 5

# Wait for dashboard to be ready
Write-Host "Waiting for dashboard to start..." -ForegroundColor Yellow
$maxAttempts = 10
$attempt = 0
$dashboardReady = $false

while ($attempt -lt $maxAttempts) {
    Start-Sleep -Seconds 2
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 2 -ErrorAction Stop
        $dashboardReady = $true
        Write-Host "  ✅ Dashboard is ready!" -ForegroundColor Green
        break
    } catch {
        $attempt++
        Write-Host "  ⏳ Waiting... ($attempt/$maxAttempts)" -ForegroundColor Gray
    }
}

Write-Host ""

# Open Chrome
if ($dashboardReady) {
    Write-Host "Opening Chrome..." -ForegroundColor Yellow
    try {
        Start-Process "chrome.exe" "http://localhost:5173"
        Write-Host "  ✅ Chrome opened!" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Could not open Chrome automatically." -ForegroundColor Yellow
        Write-Host "  Please open manually: http://localhost:5173" -ForegroundColor Cyan
    }
} else {
    Write-Host "  ⚠️  Dashboard may still be starting. Please wait a moment and open:" -ForegroundColor Yellow
    Write-Host "  http://localhost:5173" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "===============================================" -ForegroundColor Green
Write-Host "   ✅ STARTUP COMPLETE!" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Dashboard URL: http://localhost:5173" -ForegroundColor White
Write-Host "Backend API: http://localhost:4000" -ForegroundColor White
Write-Host ""
Write-Host "Features available:" -ForegroundColor Yellow
Write-Host "  ✅ Rescue statistics dashboard" -ForegroundColor Green
Write-Host "  ✅ Interactive map with rescue markers" -ForegroundColor Green
Write-Host "  ✅ Click table rows to view route navigation" -ForegroundColor Green
Write-Host "  ✅ Click map markers to view route navigation" -ForegroundColor Green
Write-Host "  ✅ Professional UI with route visualization" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit this window (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

