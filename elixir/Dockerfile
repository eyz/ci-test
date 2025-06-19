# Multi-stage build for minimal Elixir HTTP server
FROM elixir:1.18-otp-27-alpine AS build

# Install minimal build dependencies
RUN apk add --no-cache \
    git

# Set build environment
ENV MIX_ENV=prod

# Create app directory
WORKDIR /app

# Copy mix files
COPY elixir/mix.exs ./

# Install dependencies
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix deps.get --only prod && \
    mix deps.compile

# Copy application code
COPY elixir/lib ./lib

# Build release
RUN mix compile && \
    mix release

# Final stage - minimal runtime
FROM alpine:3.22.0 AS final

# Install runtime dependencies
RUN apk add --no-cache \
    openssl \
    ncurses-libs \
    libstdc++

# Create app directory
WORKDIR /app

# Copy release from build stage
COPY --from=build --chown=65534:65534 /app/_build/prod/rel/hello_world ./

# Switch to unprivileged user (UID 65534)
USER 65534:65534

# Expose port
EXPOSE 8080

# Set environment
ENV MIX_ENV=prod

# Start the application
CMD ["./bin/hello_world", "start"]
