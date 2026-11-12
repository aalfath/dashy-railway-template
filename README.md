# Dashy on Railway

Railway template for [Dashy](https://github.com/Lissy93/dashy), a self-hosted start page and app dashboard.

## What it deploys

One service, **Dashy**, built from this repo's `Dockerfile`:

- Dashy **4.9.17**, the official image pinned by digest: `lissy93/dashy:4.9.17@sha256:c3b70180ab12286c8127437431da04fa60586d78b77e68a67bc2d081c6dce03f`.
- A Railway volume at `/data` for `conf.yml` and its backups (`/data/config-backups`).
- A Railway domain, health check `/healthz`, restart on failure (all in `railway.json`).

On the first start, `railway-start.sh` writes Dashy's starter `conf.yml` to the volume and adds an `admin` user whose password is `DASHY_ADMIN_PASSWORD`. It always sets `ENABLE_HTTP_AUTH=true`, so the config file, the config editor's save endpoint and the proxy and status endpoints need a login. The script starts as root only to hand the volume to Dashy's `node` user; Dashy itself runs as `node`.

## Variables

| Variable | Default in the template | Description |
|---|---|---|
| `DASHY_ADMIN_PASSWORD` | `${{secret(32, "…")}}` (generated) | Password of the `admin` user. To change it, set a new value and redeploy. |

**Logging in:** open the Railway URL. The browser asks for a username and password first (`admin` and `DASHY_ADMIN_PASSWORD`), then Dashy's own login form asks for the same again. That two-step login is how Dashy's server-side auth works upstream.

## Updates

Projects deployed from the template build from this repo's `main` branch. When a new version is merged to `main`, Railway shows those projects an "update available" notice, and each owner chooses when to apply it. Every version is listed in [CHANGELOG.md](CHANGELOG.md), with breaking changes first.
