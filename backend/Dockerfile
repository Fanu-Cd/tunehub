# Use an official Node.js runtime as a base image
FROM node:20.8.1

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Define the command to run your app
CMD ["npm", "start"]
