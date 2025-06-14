# Hello World Elixir HTTP Server

A minimal HTTP 1.1 server written in Elixir that responds with "Hello, World!" on port 8080.

## Building and Running

### Local Development

```bash
# Install dependencies
mix deps.get

# Run the server
mix run --no-halt
```

### Docker

Build and run the containerized version:

```bash
# Build the Docker image (from parent directory)
docker build -f elixir/Dockerfile -t hello-world-elixir .

# Run the container
docker run -p 8080:8080 hello-world-elixir
```

## Testing

Once running, test the server:

```bash
curl http://localhost:8080
```

Should return: `Hello, World!`

## Features

- Minimal HTTP 1.1 server using Plug and Cowboy
- Multi-stage Docker build with Alpine Linux
- Runs as unprivileged user (uid: 1001)
- Production-ready Elixir release
- Small final image size
