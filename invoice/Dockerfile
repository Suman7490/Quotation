# Use Node.js version 20 as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app for production
RUN npm run build

# Use an official NGINX image to serve the static files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port the frontend will run on (3000)
EXPOSE 3000

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
