# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json /app/

# Install project dependencies
RUN npm install

# Copy the project files into the Docker image
COPY . /app


# Angular CLI port
EXPOSE 4200

# Start the development server
CMD ["npm", "start"]
