echo "Step 1/4: Building"
set NODE_ENV=production
call npm run deploy

echo "Step 2/5: Copying to %1"
xcopy /s/e/y "public\*" "azure\%1\"

echo "Step 2/4: Committing to %1 with message '%2'"
cd "azure\%1"
git add .
git commit -m "%2" .

echo "Step 2/4: Uploading to %1"
git push

exit 0
