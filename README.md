# CI Test Services

[![Build Matrix](https://github.com/eyz/ci-test/actions/workflows/build-matrix.yml/badge.svg)](https://github.com/eyz/ci-test/actions/workflows/build-matrix.yml)

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

## CI/CD Pipeline

This repository includes a comprehensive GitHub Actions workflow that automatically builds and tests all services:

### Build Matrix Workflow

The [`.github/workflows/build-matrix.yml`](./.github/workflows/build-matrix.yml) implements:

- **🔧 Matrix Generation**: Converts a predefined list of services to a JSON build matrix
- **🏗️ Parallel Builds**: Builds all container images simultaneously using GitHub Actions matrix strategy
- **🧪 Automated Testing**: Tests each service by starting containers and verifying HTTP responses
- **📊 Comprehensive Reporting**: Generates detailed test result summaries with status codes and response bodies
- **� Container Registry**: Automatically pushes images to GitHub Container Registry (GHCR) on successful main/master builds
- **�🔄 Triggered on**: Push to `main`/`master` branches and pull requests

#### Workflow Stages

1. **Prepare**: Converts predefined service list into build matrix from colon-separated `containerName:dockerfilePath` pairs
2. **Build**: Parallel execution for each service:
   - Builds Docker image
   - Starts container on port 8080
   - Tests HTTP endpoint with health checks
   - Captures response codes and bodies
   - **Pushes to GHCR**: On main/master branches, pushes successful builds to GitHub Container Registry
   - Uploads test results as artifacts
3. **Summary**: Consolidates all test results into a formatted report

### Viewing CI Results

After each push or pull request, check the **Actions** tab to see:
- ✅ Build status for each service
- 📋 Detailed test results in job summaries
- 🔍 Container logs and debugging information

### GitHub Container Registry (GHCR)

The workflow automatically publishes container images to GitHub Container Registry when:
- ✅ All tests pass (HTTP 200 response from each service)
- ✅ Build is on `main` or `master` branch

#### Published Images

Successfully tested images are available at:
- `ghcr.io/eyz/hello-world-elixir:latest`
- `ghcr.io/eyz/hello-world-go:latest`
- `ghcr.io/eyz/hello-world-node:latest`
- `ghcr.io/eyz/hello-world-python:latest`
- `ghcr.io/eyz/hello-world-rust:latest`

#### Image Tags

Each successful build creates multiple tags:
- `latest`: Always points to the most recent successful main/master build
- `{branch}-{sha}`: Specific commit identifier (e.g., `main-abc1234`)
- `{branch}`: Branch-specific tag

#### Using Published Images

```bash
# Pull and run any service
docker pull ghcr.io/eyz/hello-world-node:latest
docker run -p 8080:8080 ghcr.io/eyz/hello-world-node:latest

# Test the service
curl http://localhost:8080
```

#### Registry Push Logic

The workflow includes explicit logging of push decisions:
- **✅ Pushed**: "Tests passed and on main/master branch - pushing to registry..."
- **⏭️ Skipped**: "Skipping registry push: Tests failed" or "Not on main/master branch"

### Dependency Management

This repository includes comprehensive **GitHub Dependabot** configuration for automated dependency updates:

#### Supported Package Managers

- **🟢 Node.js**: `package.json` in `/node` directory (npm/pnpm)
- **🐍 Python**: `requirements.txt` in `/python` directory (pip)
- **🦀 Rust**: `Cargo.toml` in `/rust` directory (cargo)
- **💧 Elixir**: `mix.exs` in `/elixir` directory (mix) - always uses latest compatible versions
- **🐹 Go**: `go.mod` in `/go` directory (go modules)
- **🐙 GitHub Actions**: Workflow files in `.github/workflows/`
- **🐳 Docker**: Base images in all `Dockerfile`s

#### Dependabot Features

- **📅 Daily Scanning**: All dependencies checked every day at 06:00 UTC
- **🏷️ Smart Labeling**: PRs automatically labeled by language and type
- **📝 Conventional Commits**: Standardized commit messages with prefixes
- **⚡ Rate Limiting**: Configurable PR limits to avoid overwhelming maintainers
- **🔄 Multi-directory Support**: Scans each sub-project independently

The configuration is defined in [`.github/dependabot.yml`](./.github/dependabot.yml).

## Project Structure

```
ci-test/
├── .github/
│   ├── dependabot.yml         # Dependabot configuration for all package managers
│   └── workflows/
│       └── build-matrix.yml    # CI/CD pipeline configuration
├── elixir/                     # Elixir implementation using Plug + Cowboy
│   ├── Dockerfile
│   ├── README.md
│   ├── mix.exs
│   ├── config/
│   └── lib/
├── go/                         # Go implementation using standard library
│   ├── Dockerfile
│   ├── README.md
│   ├── go.mod
│   └── main.go
├── node/                       # Node.js implementation using Koa
│   ├── Dockerfile
│   ├── README.md
│   ├── package.json
│   └── server.js
├── python/                     # Python implementation using FastAPI
│   ├── Dockerfile
│   ├── README.md
│   ├── main.py
│   └── requirements.txt
└── rust/                       # Rust implementation using Hyper
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
- ✅ **Matrix-based CI/CD**: GitHub Actions workflow with configurable service matrix
- ✅ **Automated Testing**: Container health checks and endpoint validation
- ✅ **Test Reporting**: Comprehensive status and response tracking
- ✅ **Container Registry**: Automatic GHCR publishing on successful main/master builds
- ✅ **Dependency Management**: Daily Dependabot scanning for all package managers

**Ultra-minimal deployments**: Go and Rust implementations use statically linked binaries running on scratch images with no Linux distribution in the final layer.

## Use Cases

This repository is ideal for:

- **CI/CD Pipeline Testing**: Test build and deployment processes across multiple languages
- **GitHub Actions Development**: Example of dynamic matrix builds and comprehensive testing
- **Container Registry Testing**: Test image builds, pushes, and automated publishing to GHCR
- **Load Balancer Configuration**: Test routing to different services
- **Monitoring Setup**: Test metrics collection and health checks
- **Security Scanning**: Test vulnerability scans across different tech stacks
- **Infrastructure as Code**: Test deployment automation tools
- **Multi-language Development**: Template for polyglot microservices projects

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
8. **Add your service to the workflow**: Update the `SERVICES` environment variable in `.github/workflows/build-matrix.yml`
9. **Dependabot will automatically detect**: New package manager files and start monitoring dependencies

### Adding New Services

To add a new service to the CI pipeline:

1. Create your service directory and Dockerfile
2. Edit `.github/workflows/build-matrix.yml`
3. Add a new line to the `SERVICES` environment variable in the format: `containerName:path/to/Dockerfile`

Example:
```yaml
SERVICES: |
  elixir:elixir/Dockerfile
  go:go/Dockerfile
  node:node/Dockerfile
  python:python/Dockerfile
  rust:rust/Dockerfile
  java:java/Dockerfile  # <-- Add your new service here
```

