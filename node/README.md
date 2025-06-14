# Node.js Koa Hello World Server

A simple HTTP server written in Node.js using Koa that responds with "Hello, World!" on port 8080.

## Features

- HTTP/1.1+ server using Koa framework listening on port 8080
- Request logging with timestamps and response times
- **Active request tracking** - monitors concurrent requests in real-time
- **Connection monitoring** - tracks total active connections
- **Graceful shutdown** - properly handles SIGTERM/SIGINT signals with:
  - Immediate stop of new connections
  - Exits as soon as the last active request completes
  - Force close of keepalive connections after 5 seconds if no active requests
  - 10-second timeout for complete shutdown as fallback
- Async/await based middleware
- Multi-stage Docker build with Alpine Linux (node:24.2.0-alpine3.22)
- Runs as unprivileged user (UID 65534) for security
- Minimal dependencies (single dependency: koa)

## Prerequisites

- Node.js 24.2.0+ (Docker uses 24.2.0-alpine3.22)
- pnpm 10.12.1+ (package manager, enabled via corepack)
- Docker (for containerized deployment)

## Local Development

### Install dependencies

```bash
cd node
pnpm install
```

### Run the server

```bash
cd node
pnpm start
```

Or directly:
```bash
cd node
node server.js
```

The server will start on `http://localhost:8080`

## Docker

### Build the Docker image

From the parent directory (ci-test):

```bash
docker build -f node/Dockerfile -t hello-world-node .
```

### Run the Docker container

```bash
docker run -p 8080:8080 hello-world-node
```

## Testing

Once the server is running, you can test it:

```bash
curl http://localhost:8080
```

Expected response:
```
Hello, World!
```

## Dependencies

- `koa`: ^3.0.0 - Expressive HTTP middleware framework for Node.js to make web applications and APIs more enjoyable to write

## Package Manager

This project uses **pnpm 10.12.1+** for faster, more efficient package management:
- ⚡ Faster installation and builds
- 💾 Efficient disk space usage with content-addressed storage
- 🔒 Stricter dependency resolution
- 📦 Better CI/CD performance

**Note**: The project uses production dependencies only (`--prod` flag) during Docker builds. The `package.json` specifies pnpm@10.12.1 which is enabled via corepack in the Docker build. Dependencies are resolved fresh during each build for maximum compatibility and security.

## Logging

The server logs:
- Startup messages with timestamps
- **Active request count** - real-time monitoring of concurrent requests
- **Connection tracking** - logs when connections are established and closed
- Each HTTP request with method, URL, status code, and response time
- **Graceful shutdown progress** - detailed shutdown sequence logging
- ISO timestamp format for consistency

## Graceful Shutdown

The server implements proper graceful shutdown:
- Listens for SIGTERM and SIGINT signals
- Stops accepting new connections immediately
- **Exits as soon as all active requests complete naturally**
- If no active requests: immediately closes all keepalive connections
- If active requests exist: waits for completion, then forces close of keepalive connections after 5 seconds
- Has a 10-second timeout to force exit if graceful shutdown fails
- Logs shutdown progress with timestamps
