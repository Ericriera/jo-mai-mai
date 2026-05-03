#!/bin/sh
set -eu

API_URL="${EXPO_PUBLIC_API_URL:-/api}"
API_URL_ESCAPED="$(printf '%s' "$API_URL" | sed 's/\\/\\\\/g; s/"/\\"/g')"

cat > /usr/share/nginx/html/env.js <<EOF
window.__APP_CONFIG__ = {
  EXPO_PUBLIC_API_URL: "${API_URL_ESCAPED}"
};
EOF

exec "$@"
