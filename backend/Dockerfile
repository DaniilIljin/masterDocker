# Use the official Node.js image.
FROM node:alpine

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY backend/package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY backend/ .

# Expose the port.
EXPOSE 3000

# Command to run the application.
CMD ["node", "server.js"]
