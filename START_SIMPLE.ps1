# SafeLink - Simple Startup Script
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SafeLink System Startup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Stop existing processes
Write-Host "Stopping existing processes..." -ForegroundColor Yellow
$backendProcs = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
$dashboardProcs = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($backendProcs) {
    foreach ($p in $backendProcs) { Stop-Process -Id $p -Force -ErrorAction SilentlyContinue }
    Write-Host "  Stopped backend on port 4000" -ForegroundColor Green
}

if ($dashboardProcs) {
    foreach ($p in $dashboardProcs) { Stop-Process -Id $p -Force -ErrorAction SilentlyContinue }
    Write-Host "  Stopped dashboard on port 5173" -ForegroundColor Green
}

Start-Sleep -Seconds 2

# Start Backend
Write-Host ""
Write-Host "Starting Backend Server (port 4000)..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'SafeLink Backend - Port 4000' -ForegroundColor Green; npm start"
Start-Sleep -Seconds 3
Write-Host "  Backend starting in new window" -ForegroundColor Green

# Start Dashboard
Write-Host ""
Write-Host "Starting Dashboard (port 5173)..." -ForegroundColor Yellow
$dashboardPath = Join-Path $PSScriptRoot "safelink-dashboard"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$dashboardPath'; Write-Host 'SafeLink Dashboard - Port 5173' -ForegroundColor Green; npm run dev"
Start-Sleep -Seconds 5
Write-Host "  Dashboard starting in new window" -ForegroundColor Green

# Wait and open browser
Write-Host ""
Write-Host "Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   System Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:4000" -ForegroundColor White
Write-Host "Dashboard: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Both services are running in separate windows." -ForegroundColor Gray
Write-Host "Dashboard should open automatically!" -ForegroundColor Green
Write-Host ""

