# Important: Restart Dev Server

The Prisma client needs to be regenerated after adding new models. Please follow these steps:

## Steps to Fix:

1. **Stop the development server** (if it's running)
   - Press `Ctrl+C` in the terminal where `npm run dev` is running

2. **Regenerate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

## Alternative (if Prisma generate fails due to file lock):

1. Stop the dev server
2. Delete the `.next` folder:
   ```bash
   rm -rf .next
   # or on Windows PowerShell:
   Remove-Item -Recurse -Force .next
   ```
3. Run `npx prisma generate`
4. Restart with `npm run dev`

## Why this is needed:

After adding new Prisma models (Course, ContentCard, ContentList), the Prisma client needs to be regenerated so that TypeScript and the runtime code can access these new models. The dev server caches the Prisma client, so it needs to be restarted after regeneration.








