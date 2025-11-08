# SafeLink Dashboard Startup Script

Write-Host "`n" -NoNewline
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   🎯 SAFELINK COMMAND CENTER DASHBOARD" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "  ✅ Backend server must be running on port 4000" -ForegroundColor White
Write-Host "  ✅ Run: cd ../server && npm start" -ForegroundColor Gray
Write-Host ""

Write-Host "Starting dashboard..." -ForegroundColor Yellow
Write-Host "  Dashboard will open at: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""

Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Gray

npm run dev

