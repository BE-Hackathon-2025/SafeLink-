# Start SafeLink System - Backend + Dashboard

Write-Host "`n" -NoNewline
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   🚀 STARTING SAFELINK SYSTEM" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill existing server
Write-Host "Step 1: Stopping old server..." -ForegroundColor Yellow
try {
    $process = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Write-Host "  ✅ Stopped old server process" -ForegroundColor Green
        Start-Sleep -Seconds 2
    }
} catch {
    Write-Host "  ℹ️  No existing server found" -ForegroundColor Gray
}

# Step 2: Start Backend Server
Write-Host "`nStep 2: Starting Backend Server..." -ForegroundColor Yellow
$serverPath = Join-Path $PSScriptRoot "server"
if (Test-Path $serverPath) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host '`n[SafeLink Backend Server]' -ForegroundColor Green; Write-Host 'Starting on http://localhost:4000...' -ForegroundColor Cyan; Write-Host ''; npm start" -WindowStyle Normal
    Write-Host "  ✅ Backend server starting in new window" -ForegroundColor Green
    Write-Host "  ⏳ Waiting for server to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
} else {
    Write-Host "  ❌ Server directory not found" -ForegroundColor Red
    exit 1
}

# Step 3: Test Backend
Write-Host "`nStep 3: Testing Backend..." -ForegroundColor Yellow
$maxRetries = 10
$retryCount = 0
$backendReady = $false

while ($retryCount -lt $maxRetries -and -not $backendReady) {
    try {
        $health = Invoke-RestMethod -Uri "http://localhost:4000/health" -TimeoutSec 2 -ErrorAction Stop
        Write-Host "  ✅ Backend server is running!" -ForegroundColor Green
        
        # Test rescue API
        try {
            $stats = Invoke-RestMethod -Uri "http://localhost:4000/api/rescues/stats" -TimeoutSec 2 -ErrorAction Stop
            Write-Host "  ✅ Rescue API is working!" -ForegroundColor Green
            Write-Host "     Total events: $($stats.total)" -ForegroundColor Gray
            $backendReady = $true
        } catch {
            Write-Host "  ⚠️  Rescue API not ready yet, retrying..." -ForegroundColor Yellow
            Start-Sleep -Seconds 2
            $retryCount++
        }
    } catch {
        Write-Host "  ⏳ Waiting for server... ($retryCount/$maxRetries)" -ForegroundColor Yellow
        Start-Sleep -Seconds 2
        $retryCount++
    }
}

if (-not $backendReady) {
    Write-Host "  ⚠️  Backend may still be starting. You can continue anyway." -ForegroundColor Yellow
}

# Step 4: Start Dashboard
Write-Host "`nStep 4: Starting Dashboard..." -ForegroundColor Yellow
$dashboardPath = Join-Path $PSScriptRoot "safelink-dashboard"
if (Test-Path $dashboardPath) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$dashboardPath'; Write-Host '`n[SafeLink Dashboard]' -ForegroundColor Green; Write-Host 'Starting on http://localhost:3001...' -ForegroundColor Cyan; Write-Host 'Opening in Chrome...' -ForegroundColor Yellow; Write-Host ''; npm run dev" -WindowStyle Normal
    Write-Host "  ✅ Dashboard starting in new window" -ForegroundColor Green
    Write-Host "  🌐 Dashboard will open at: http://localhost:3001" -ForegroundColor Cyan
} else {
    Write-Host "  ❌ Dashboard directory not found" -ForegroundColor Red
    exit 1
}

# Step 5: Add Sample Data
Write-Host "`nStep 5: Adding Sample Data..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
try {
    $sampleData = @{
        type = "ACCEPT"
        alertId = "demo-alert-001"
        helperId = "volunteer-demo-1"
        distanceKm = 2.4
        etaMinutes = 12
        latitude = 37.7749
        longitude = -122.4194
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:4000/api/rescues" -Method Post -Body $sampleData -ContentType "application/json" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  ✅ Added sample ACCEPT event" -ForegroundColor Green
    
    # Add ARRIVED event
    Start-Sleep -Seconds 1
    $arrivedData = @{
        type = "ARRIVED"
        alertId = "demo-alert-001"
        helperId = "volunteer-demo-1"
        latitude = 37.7749
        longitude = -122.4194
    } | ConvertTo-Json
    
    $response2 = Invoke-RestMethod -Uri "http://localhost:4000/api/rescues" -Method Post -Body $arrivedData -ContentType "application/json" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  ✅ Added sample ARRIVED event" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  Could not add sample data: $_" -ForegroundColor Yellow
    Write-Host "     You can add data manually later" -ForegroundColor Gray
}

# Summary
Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "   ✅ SYSTEM STARTED!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend Server:" -ForegroundColor Yellow
Write-Host "  URL: http://localhost:4000" -ForegroundColor Cyan
Write-Host "  Health: http://localhost:4000/health" -ForegroundColor Gray
Write-Host "  Stats: http://localhost:4000/api/rescues/stats" -ForegroundColor Gray
Write-Host ""
Write-Host "Dashboard:" -ForegroundColor Yellow
Write-Host "  URL: http://localhost:3001" -ForegroundColor Cyan
Write-Host "  Status: Opening in Chrome..." -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Wait for dashboard to open in Chrome" -ForegroundColor White
Write-Host "  2. Verify statistics display correctly" -ForegroundColor White
Write-Host "  3. Check map shows markers (if data exists)" -ForegroundColor White
Write-Host "  4. Verify table displays rescue events" -ForegroundColor White
Write-Host ""
Write-Host "System is ready for testing!" -ForegroundColor Green
Write-Host ""

