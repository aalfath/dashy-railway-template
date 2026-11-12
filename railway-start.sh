#!/bin/sh
# Railway start script for Dashy (lissy93/dashy).
# Seeds conf.yml on the volume, turns on server-side auth and keeps the admin
# password in sync with DASHY_ADMIN_PASSWORD.
set -e
export ENABLE_HTTP_AUTH=true
export USER_DATA_DIR="${USER_DATA_DIR:-/data}"
export DASHY_ADMIN_USER="${DASHY_ADMIN_USER:-admin}"

# Railway volumes are owned by root: fix ownership, then drop to the image's node user.
if [ "$(id -u)" = 0 ]; then
  mkdir -p "$USER_DATA_DIR"
  chown -R 1000:1000 "$USER_DATA_DIR"
  exec su -p -s /bin/sh node -c "exec /bin/sh $0"
fi

node /usr/local/lib/railway-seed.js
cd /app
exec node server.js
