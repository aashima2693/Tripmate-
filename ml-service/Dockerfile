# Use a slim, stable Python base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV APP_PORT 8001

# Set the working directory
WORKDIR /app

# Copy requirements file first to take advantage of Docker caching
# This step only runs again if requirements.txt changes
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the entire application code
# This copies everything from the ml-service folder into the /app directory
COPY . .

# Expose the port where the FastAPI server will listen
EXPOSE ${APP_PORT}

# Command to run the application using Uvicorn
# Uses the full module path: src.main file and 'app' object inside it
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8001"]