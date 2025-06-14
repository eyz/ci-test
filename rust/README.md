# Rust Hello World HTTP Server

A simple HTTP server written in Rust that responds with "Hello, World!" on port 8080.

## Prerequisites

- Rust (for local development)
- Docker (for containerized deployment)

## Running Locally

```bash
cargo run
```

The server will start on `http://localhost:8080`

## Building and Running with Docker

Build the Docker image from the parent directory:
```bash
docker build -f rust/Dockerfile -t rust-hello-world .
```

Run the container:
```bash
docker run -p 8080:8080 rust-hello-world
```

## Testing

Once the server is running, you can test it by visiting:
- `http://localhost:8080` in your browser
- Or using curl: `curl http://localhost:8080`

You should see "Hello, World!" as the response.
