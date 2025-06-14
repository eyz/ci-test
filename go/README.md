# Go HTTP Hello World Server

A simple HTTP 1.1 server written in Go that responds with "Hello, World!" on port 8080.

## Features

- HTTP 1.1 server listening on port 8080
- Logs server startup and each HTTP request
- Multi-stage Docker build with Alpine Linux
- Statically compiled binary
- Runs as unprivileged user for security
- **Ultra-minimal deployment**: Runs on scratch image with no Linux distribution in the final layer

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

The binary is statically linked and contains no external dependencies, allowing it to run on a scratch Docker image with no Linux distribution in the final layer.

### Test the server

```bash
curl http://localhost:8080
```

Expected response: `Hello, World!` (with newline)

## Docker

### Build the Docker image

From the parent directory (ci-test):

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

## Logs

The server logs:
- Server startup message with port information
- Each incoming HTTP request with method, client IP, and path
