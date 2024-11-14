# Use the official Python image from DockerHub
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies for building Python packages
RUN apt-get update \
    && apt-get install -y gcc libpq-dev build-essential

# Set working directory
WORKDIR /app

# Install dependencies
COPY prerequisite.txt /app/
RUN pip install --upgrade pip
RUN pip install -r prerequisite.txt

# Copy project files
COPY . /app

# Expose port 5000 for Flask
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
