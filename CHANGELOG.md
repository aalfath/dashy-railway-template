# Changelog

Each entry is one version of this Railway template. Breaking changes are listed first.
Read the entry before you apply an update in Railway.

## 4.9.17-1 (2026-11-12)

- First version: Dashy 4.9.17 (`lissy93/dashy:4.9.17@sha256:c3b70180ab12286c8127437431da04fa60586d78b77e68a67bc2d081c6dce03f`).
- Seeds `/data/conf.yml` with Dashy's starter config and an `admin` user on the first start.
- Server-side auth (`ENABLE_HTTP_AUTH`) is always on.

## Unreleased

- README: Deploy on Railway button, linked to the template `bBRT7C`. No change to the running service.
- Removed `railway.json`: Railway stops reading it on 2026-12-01. The health check (`/healthz`) and restart policy are set on the template's service config instead. No change to the running service.
