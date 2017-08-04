#!/bin/bash
if [ $# -lt 2 ]; then
    echo "Usage ./deploy.sh [prod|staging] 'Commit Message'"
    exit 1;
fi

set -x
echo "Step 1/4: Building"
npm run deploy

echo "Step 2/5: Copying to $1"
cp -a public/* "azure/$1/"

echo "Step 2/4: Committing to $1 with message '$2'"
cd "azure/$1"
git add .
git commit -m $2 .

echo "Step 2/4: Uploading $1"
git push