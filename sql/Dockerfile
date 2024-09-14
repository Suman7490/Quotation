# Use the official Node.js v20.16.0 image from DockerHub
FROM node:20.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port (8081)
EXPOSE 8081

# Command to start the Node.js app
CMD ["node", "server.js"]
