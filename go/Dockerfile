# Build stage
FROM golang:1.24.4-alpine3.22 AS build

# Set working directory
WORKDIR /app

# Copy source code
COPY go/ ./

# Build the application statically
RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o server main.go

# Final stage - scratch image
FROM scratch AS final

# Copy the binary from build stage
COPY --from=build /app/server /server

# Run as unprivileged user (uid 65534)
USER 65534:65534

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["/server"]
