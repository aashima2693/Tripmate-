# Use a recommended Node.js base image
FROM node:18-alpine

# Set environment variables
ENV PORT 8000

# Set the working directory
WORKDIR /app

# Copy package files first to install dependencies
# This step only runs again if package.json or package-lock.json changes
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
# This copies everything from the backend folder into the /app directory
COPY . .

# Expose the public port for the Node.js application
EXPOSE ${PORT}

# Command to start the Express server
# Assumes your main application entry point is server.js
CMD ["node", "server.js"]