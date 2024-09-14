# Use Node.js version 20 as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY sql/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (8081 for your backend)
EXPOSE 8081

# Start the server
CMD ["node", "server.js"]
