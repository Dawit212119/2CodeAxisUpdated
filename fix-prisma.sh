#!/bin/bash
# Script to fix Prisma client sync issue
# Run this script after stopping the dev server

echo "Clearing Next.js cache..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "✓ .next folder deleted"
else
    echo "✓ .next folder doesn't exist"
fi

echo ""
echo "Regenerating Prisma Client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Prisma Client regenerated successfully!"
    echo ""
    echo "You can now restart the dev server with: npm run dev"
else
    echo ""
    echo "✗ Error regenerating Prisma Client"
    echo "Make sure the dev server is stopped before running this script."
fi








