# Rust Hello World HTTP Server

A simple HTTP server written in Rust using Hyper that responds with "Hello, World!" on port 8080.

## Features

- Async HTTP server using Hyper 1.0
- Multi-threaded Tokio runtime
- Request logging with connection tracking
- **Graceful shutdown**: Responds to SIGTERM and SIGINT (Ctrl+C) signals
- Multi-stage Docker build with Alpine Linux
- Statically compiled binary
- Runs as unprivileged user for security
- **Ultra-minimal deployment**: Runs on scratch image with no Linux distribution in the final layer

## Prerequisites

- Rust (for local development)
- Docker (for containerized deployment)

## Running Locally

```bash
cargo run
```

The server will start on `http://localhost:8080`. Press **Ctrl+C** to gracefully shutdown the server.

## Building and Running with Docker

Build the Docker image from the parent directory (ci-test):
```bash
docker build -f rust/Dockerfile -t hello-world-rust .
```

Run the container:
```bash
docker run -p 8080:8080 hello-world-rust
```

The Rust binary is statically compiled using musl and runs on a scratch Docker image with no Linux distribution in the final layer, resulting in an extremely minimal container.

## Testing

Once the server is running, you can test it by visiting:
- `http://localhost:8080` in your browser
- Or using curl: `curl http://localhost:8080`

You should see "Hello, World!" as the response (with a trailing newline).

## Dependencies

- `hyper`: A fast and correct HTTP implementation for Rust
- `hyper-util`: Utilities for working with Hyper
- `tokio`: Asynchronous runtime for Rust (with signal handling support)
- `http-body-util`: Utilities for working with HTTP bodies
