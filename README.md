# CI Test Services

A collection of simple "Hello World" HTTP servers implemented in different programming languages for testing CI/CD pipelines and containerization. Each service listens on port 8080 and provides a simple HTTP endpoint.

## Overview

This repository contains five different implementations of a basic HTTP server:

| Language | Framework/Library | Response Format | Port | Container |
|----------|-------------------|-----------------|------|-----------|
| **Elixir** | Plug + Cowboy | Plain text: `Hello, World!\n` | 8080 | Alpine Linux |
| **Go** | Standard library | Plain text: `Hello, World!\n` | 8080 | Scratch (no distro) |
| **Node.js** | Koa | Plain text: `Hello, World!\n` | 8080 | Alpine Linux |
| **Python** | FastAPI + Uvicorn | Plain text: `Hello, World!\n` | 8080 | Alpine Linux |
| **Rust** | Hyper | Plain text: `Hello, World!\n` | 8080 | Scratch (no distro) |

## Quick Start

Each service can be run locally or in Docker containers. See individual README files in each language directory for detailed instructions.

### Running with Docker

All services can be built and run using Docker from the root directory:

```bash
(
  # Elixir
  docker build -f elixir/Dockerfile -t hello-world-elixir .
  docker run -p 8080:8080 hello-world-elixir

  # Go
  docker build -f go/Dockerfile -t hello-world-go .
  docker run -p 8080:8080 hello-world-go

  # Node.js
  docker build -f node/Dockerfile -t hello-world-node .
  docker run -p 8080:8080 hello-world-node

  # Python
  docker build -f python/Dockerfile -t hello-world-python .
  docker run -p 8080:8080 hello-world-python

  # Rust
  docker build -f rust/Dockerfile -t hello-world-rust .
  docker run -p 8080:8080 hello-world-rust
)
```

### Testing Services

Once any service is running, test it with:

```bash
curl http://localhost:8080
```

## Project Structure

```
ci-test/
├── elixir/          # Elixir implementation using Plug + Cowboy
│   ├── Dockerfile
│   ├── README.md
│   ├── mix.exs
│   ├── mix.lock
│   ├── config/
│   └── lib/
├── go/              # Go implementation using standard library
│   ├── Dockerfile
│   ├── README.md
│   ├── go.mod
│   └── main.go
├── node/            # Node.js implementation using Koa
│   ├── Dockerfile
│   ├── README.md
│   ├── package.json
│   └── server.js
├── python/          # Python implementation using FastAPI
│   ├── Dockerfile
│   ├── README.md
│   ├── main.py
│   └── requirements.txt
└── rust/            # Rust implementation using Hyper
    ├── Dockerfile
    ├── README.md
    ├── Cargo.toml
    └── src/
```

## Features

All implementations include:

- ✅ HTTP server on port 8080
- ✅ GET endpoint at `/` root path
- ✅ Request logging
- ✅ Multi-stage Docker builds
- ✅ Security: runs as unprivileged user
- ✅ Minimal container images
- ✅ Production-ready configurations

**Ultra-minimal deployments**: Go and Rust implementations use statically linked binaries running on scratch images with no Linux distribution in the final layer.

## Use Cases

This repository is ideal for:

- **CI/CD Pipeline Testing**: Test build and deployment processes across multiple languages
- **Container Registry Testing**: Test image builds and pushes
- **Load Balancer Configuration**: Test routing to different services
- **Monitoring Setup**: Test metrics collection and health checks
- **Security Scanning**: Test vulnerability scans across different tech stacks
- **Infrastructure as Code**: Test deployment automation tools

## Development

Each service includes both local development instructions and Docker deployment options. Refer to the individual README files for language-specific setup instructions:

- [Elixir README](./elixir/README.md)
- [Go README](./go/README.md)
- [Node.js README](./node/README.md)
- [Python README](./python/README.md)
- [Rust README](./rust/README.md)

## Contributing

When adding new language implementations:

1. Create a new directory with the language name
2. Implement a basic HTTP server on port 8080
3. Add a multi-stage Dockerfile
4. Include a comprehensive README.md
5. Ensure the service runs as an unprivileged user
6. Add request logging
7. Update this root README.md
