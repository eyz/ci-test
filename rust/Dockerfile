# Use the official Rust image as the base image
FROM rust:1.87.0-alpine3.22 AS build

# Install musl development tools and target for static linking
RUN apk add --no-cache musl-dev && \
    rustup target add x86_64-unknown-linux-musl

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the source code
COPY rust/ ./

# Update all dependencies to latest compatible versions
RUN cargo update

# Build the application statically
RUN cargo build --release --target x86_64-unknown-linux-musl

# Start a new stage for the runtime image using scratch (no OS)
FROM scratch AS final

# Copy the statically linked binary from the build stage
COPY --from=build /usr/src/app/target/x86_64-unknown-linux-musl/release/rust-hello-world /rust-hello-world

# Run as unprivileged user (UID 65534)
USER 65534:65534

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["/rust-hello-world"]
