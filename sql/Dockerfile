# Use the official Node.js image from the Docker Hub
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port (if your app runs on port 3000, for example)
ENV PORT=8081

EXPOSE 8081
# Start the backend service
CMD ["npm", "start"]
