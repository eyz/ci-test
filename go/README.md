# Go HTTP Hello World Server

A simple HTTP 1.1 server written in Go that responds with "Hello, World!" on port 8080.

## Features

- HTTP 1.1 server listening on port 8080
- Logs server startup and each HTTP request
- Multi-stage Docker build with Alpine Linux 3.22
- Statically compiled binary
- Runs as unprivileged user (nobody) for security
- Minimal scratch-based final image

## Local Development

### Run with Go

```bash
cd go
go run main.go
```

### Build statically

```bash
cd go
CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o server main.go
./server
```

### Test the server

```bash
curl http://localhost:8080
```

## Docker

### Build the Docker image

From the parent directory (test-services):

```bash
docker build -f go/Dockerfile -t hello-world-go .
```

### Run the Docker container

```bash
docker run -p 8080:8080 hello-world-go
```

### Test the containerized server

```bash
curl http://localhost:8080
```

## Docker Image Details

- **Build Image**: golang:1.23-alpine3.22
- **Final Image**: scratch (minimal size)
- **Go Version**: 1.23 (latest stable)
- **Security**: Runs as nobody user (unprivileged)
- **Binary**: Statically compiled (no dependencies)
- **Size**: Ultra-minimal with scratch base

## Logs

The server logs:
- Server startup message with port information
- Each incoming HTTP request with method, client IP, and path
