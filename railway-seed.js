// Seeds /data/conf.yml with Dashy's starter config and an admin user on the first start,
// and updates the admin's password hash when DASHY_ADMIN_PASSWORD changes.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const yaml = require('/app/services/utils/yaml');

const dir = process.env.USER_DATA_DIR;
const file = path.join(dir, 'conf.yml');
const user = process.env.DASHY_ADMIN_USER;
const pw = process.env.DASHY_ADMIN_PASSWORD;
const hash = pw ? crypto.createHash('sha256').update(pw).digest('hex').toUpperCase() : null;

if (!fs.existsSync(file)) {
  if (!hash) {
    console.error('[railway] DASHY_ADMIN_PASSWORD must be set for the first start');
    process.exit(1);
  }
  const conf = yaml.load(fs.readFileSync('/app/user-data/conf.yml', 'utf8')) || {};
  conf.appConfig = conf.appConfig || {};
  conf.appConfig.auth = { users: [{ user, hash, type: 'admin' }] };
  const head = '# yaml-language-server: $schema=https://raw.githubusercontent.com/Lissy93/dashy/master/src/utils/config/ConfigSchema.json\n'
    + '# Seeded by the Railway template. Log in as the admin user with DASHY_ADMIN_PASSWORD.\n'
    + '# Keep appConfig.auth.users: without it the dashboard and its config editor are public.\n---\n';
  fs.writeFileSync(file, head + yaml.dump(conf, { lineWidth: -1 }));
  console.log(`[railway] Created ${file} with admin user "${user}"`);
} else if (hash) {
  const raw = fs.readFileSync(file, 'utf8');
  const conf = yaml.load(raw) || {};
  const users = (conf.appConfig && conf.appConfig.auth && conf.appConfig.auth.users) || [];
  const u = users.find((x) => x && x.user && String(x.user).toLowerCase() === user.toLowerCase());
  if (u && u.hash && String(u.hash).toUpperCase() !== hash) {
    fs.writeFileSync(file, raw.split(String(u.hash)).join(hash));
    console.log(`[railway] Updated the password of "${user}" from DASHY_ADMIN_PASSWORD`);
  }
  if (!users.length) console.warn('[railway] conf.yml has no auth users: the dashboard is public');
}
