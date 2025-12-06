# Script to fix Prisma client sync issue
# Run this script after stopping the dev server

Write-Host "Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ .next folder deleted" -ForegroundColor Green
} else {
    Write-Host "✓ .next folder doesn't exist" -ForegroundColor Green
}

Write-Host "`nRegenerating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Prisma Client regenerated successfully!" -ForegroundColor Green
    Write-Host "`nYou can now restart the dev server with: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "`n✗ Error regenerating Prisma Client" -ForegroundColor Red
    Write-Host "Make sure the dev server is stopped before running this script." -ForegroundColor Yellow
}






