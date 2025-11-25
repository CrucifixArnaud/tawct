#!/usr/bin/env bash
set -euo pipefail

# LOAD ENV VARIABLES
if [ -f .env ]; then
  echo "📦 Loading environment variables from .env..."
  set -a
  source .env
  set +a
fi

: "${BUILD_DIR:=dist}"
: "${REMOTE_USER:=john}"
: "${REMOTE_HOST:=nakatomi.org}"
: "${REMOTE_PATH:=/var/www/tawct}"

TARGET_DIR="$REMOTE_PATH"

# CLEAN PREVIOUS BUILD
rm -rf "'$TARGET_DIR'/*"

# BUILD STEP
echo "🛠  Building site"
npm run build

# VERIFY BUILD
if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory '$BUILD_DIR' not found!"
  exit 1
fi

# DEPLOY STEP
echo "🚀 Deploying built site to $TARGET_DIR ..."

ssh "$REMOTE_USER@$REMOTE_HOST" "rm -rf '$TARGET_DIR'/*"

rsync -avz "$BUILD_DIR"/ "$REMOTE_USER@$REMOTE_HOST:$TARGET_DIR"

echo "✅ Deployment complete!"
