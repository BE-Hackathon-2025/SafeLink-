# Start Dashboard Server
# This script starts the SafeLink Dashboard

Write-Host "`n[SafeLink Dashboard Server]`n" -ForegroundColor Green

Set-Location "$PSScriptRoot\safelink-dashboard"

Write-Host "Installing dependencies (if needed)..." -ForegroundColor Yellow
npm install

Write-Host "`nStarting dashboard on http://localhost:5173...`n" -ForegroundColor Cyan

npm run dev
