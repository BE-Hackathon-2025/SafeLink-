# Restart SafeLink Backend Server

Write-Host "`n🔄 Restarting SafeLink Backend Server`n" -ForegroundColor Cyan

# Kill any existing Node processes on port 4000
Write-Host "1. Stopping existing server..." -ForegroundColor Yellow
try {
    $process = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ Stopped process on port 4000" -ForegroundColor Green
        Start-Sleep -Seconds 2
    } else {
        Write-Host "   ℹ️  No process found on port 4000" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ⚠️  Could not stop process: $_" -ForegroundColor Yellow
}

# Start the server
Write-Host "`n2. Starting server..." -ForegroundColor Yellow
$serverPath = Join-Path $PSScriptRoot "server"
if (-not (Test-Path $serverPath)) {
    Write-Host "   ❌ Server directory not found: $serverPath" -ForegroundColor Red
    exit 1
}

Write-Host "   Starting server in new window..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host 'Starting SafeLink Server...' -ForegroundColor Green; npm start" -WindowStyle Normal

Write-Host "   ⏳ Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test the server
Write-Host "`n3. Testing server..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:4000/health" -TimeoutSec 5
    Write-Host "   ✅ Server is running!" -ForegroundColor Green
    
    # Test rescue endpoints
    try {
        $stats = Invoke-RestMethod -Uri "http://localhost:4000/api/rescues/stats" -TimeoutSec 5
        Write-Host "   ✅ Rescue API is working!" -ForegroundColor Green
        Write-Host "      Total events: $($stats.total)" -ForegroundColor Gray
    } catch {
        Write-Host "   ⚠️  Rescue API not responding yet (may need a moment)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Server failed to start" -ForegroundColor Red
    Write-Host "   Please start manually: cd server; npm start" -ForegroundColor Yellow
}

Write-Host "`n✅ Server restart complete!`n" -ForegroundColor Green

