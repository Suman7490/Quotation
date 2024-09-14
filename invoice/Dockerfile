# Use a Node.js image to build the frontend assets
FROM node:20.16.0 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Now use an NGINX image to serve the built static files
FROM nginx:stable-alpine

# Copy the built files from the previous stage to the NGINX public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
