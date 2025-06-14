# Build stage
FROM python:3.13.5-alpine3.22 AS build

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY python/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY python/main.py .

# Final stage
FROM python:3.13.5-alpine3.22 AS final

# Set working directory
WORKDIR /app

# Copy installed packages from build stage
COPY --from=build /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages

# Copy executable scripts from build stage
COPY --from=build /usr/local/bin /usr/local/bin

# Copy application code from build stage
COPY --from=build /app/main.py .

# Switch to unprivileged user (UID 65534)
USER 65534:65534

# Expose port 8080
EXPOSE 8080

# Run the application with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
