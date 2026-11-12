# Dashy for Railway: the official image, pinned by version and digest, plus a small start script.
FROM lissy93/dashy:4.9.17@sha256:c3b70180ab12286c8127437431da04fa60586d78b77e68a67bc2d081c6dce03f

# The start script begins as root only to hand the Railway volume (owned by root) to the
# image's node user (uid 1000), then runs Dashy as node.
USER root

COPY railway-start.sh /usr/local/bin/railway-start.sh
COPY railway-seed.js /usr/local/lib/railway-seed.js
RUN chmod 755 /usr/local/bin/railway-start.sh

ENV USER_DATA_DIR=/data

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/bin/sh", "/usr/local/bin/railway-start.sh"]
