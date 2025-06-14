.PHONY: build run docker-build docker-run clean test

# Variables
IMAGE_NAME = hello-world-go
PORT = 8080

# Build the Go binary
build:
	cd go && go build -o main .

# Run the server locally
run:
	cd go && go run main.go

# Build Docker image (run from parent directory)
docker-build:
	docker build -f go/Dockerfile -t $(IMAGE_NAME) .

# Run Docker container
docker-run:
	docker run -p $(PORT):$(PORT) --name hello-world-container $(IMAGE_NAME)

# Stop and remove Docker container
docker-stop:
	docker stop hello-world-container || true
	docker rm hello-world-container || true

# Test the server
test:
	curl -f http://localhost:$(PORT) || echo "Server not responding"

# Clean up
clean:
	cd go && rm -f main
	docker stop hello-world-container || true
	docker rm hello-world-container || true
	docker rmi $(IMAGE_NAME) || true

# Development workflow
dev: build run
