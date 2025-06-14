# Use minimal Alpine Linux image with Python
FROM python:3.13.5-alpine3.22

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY python/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY python/main.py .

# Switch to unprivileged user (UID 65534)
USER 65534:65534

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["python", "main.py"]
