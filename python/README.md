# Python FastAPI Hello World Server

A simple HTTP server written in Python using FastAPI that responds with "Hello, World!" on port 8080.

## Features

- FastAPI-based REST API server listening on port 8080
- Plain text response format
- Request logging via Uvicorn ASGI server
- FastAPI async framework with Uvicorn ASGI server
- Multi-stage Docker build with Alpine Linux
- Runs as unprivileged user for security
- Minimal dependencies

## Prerequisites

- Python 3.13+ (for local development)
- Docker (for containerized deployment)

## Local Development

### Install dependencies

```bash
cd python
pip install -r requirements.txt
```

### Run the server

```bash
cd python
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

The server will start on `http://localhost:8080`

## Docker

### Build the Docker image

From the parent directory (ci-test):

```bash
docker build -f python/Dockerfile -t hello-world-python .
```

### Run the Docker container

```bash
docker run -p 8080:8080 hello-world-python
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

*Note: Response includes a trailing newline character.*

## Dependencies

- `fastapi`: Modern, fast web framework for building APIs
- `uvicorn[standard]`: Lightning-fast ASGI server with performance optimizations

## Logging

The server uses Uvicorn's built-in request logging which includes:
- Server startup and configuration messages
- Each HTTP request with client IP, method, path, HTTP version, and status code
- Standard ASGI server log format
