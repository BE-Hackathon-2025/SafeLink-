# SafeLink Mesh AI - Restart All Services Script

Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "   SafeLink Mesh AI - Restarting Services" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Stop any existing Node.js processes on port 4000
Write-Host "Stopping existing server on port 4000..." -ForegroundColor Yellow
try {
    $process = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
        Write-Host "  ✓ Stopped existing server" -ForegroundColor Green
    } else {
        Write-Host "  ✓ No existing server found" -ForegroundColor Green
    }
} catch {
    Write-Host "  ✓ Port 4000 is free" -ForegroundColor Green
}

Write-Host ""

# Start backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Set-Location server
    npm start
}

Start-Sleep -Seconds 3

# Check if server started successfully
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/health" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  ✓ Backend server is running on http://localhost:4000" -ForegroundColor Green
} catch {
    Write-Host "  ⚠ Backend server may still be starting..." -ForegroundColor Yellow
    Write-Host "    Waiting a bit longer..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4000/health" -TimeoutSec 5 -ErrorAction Stop
        Write-Host "  ✓ Backend server is running" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Backend server failed to start. Check server/index.js" -ForegroundColor Red
    }
}

Write-Host ""

# Start dashboard
Write-Host "Starting dashboard..." -ForegroundColor Yellow
Set-Location safelink-dashboard
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
Start-Sleep -Seconds 2
Set-Location ..

Write-Host "  ✓ Dashboard starting on http://localhost:5173" -ForegroundColor Green
Write-Host ""

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   Services Restarted!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API: http://localhost:4000" -ForegroundColor White
Write-Host "Dashboard:   http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the backend server" -ForegroundColor Yellow
Write-Host ""

# Keep script running to monitor backend
try {
    Wait-Job $serverJob | Out-Null
    Receive-Job $serverJob
} catch {
    Write-Host "Backend server stopped." -ForegroundColor Yellow
}

