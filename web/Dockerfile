

# # Use the official Node.js image as a base
# FROM node:latest

# # Set working directory
# WORKDIR /usr/src/app

# # Install nvm (Node Version Manager)
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# # Set NVM_DIR so that nvm works properly
# ENV NVM_DIR /root/.nvm

# # Load nvm and install Node.js
# RUN /bin/bash -c "source $NVM_DIR/nvm.sh \
#     && nvm install --lts \
#     && nvm use --lts"

# # Verify installation
# RUN node -v
# RUN npm -v

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose port 3000 for React development server
# EXPOSE 3000

# # Default command to start React app
# CMD ["npm", "start"]
# -------------------------------------------------------------------
# # Stage 1: Build React application
# FROM node:14-alpine AS build

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY ./package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . ./

# # Build the React application
# RUN npm run build

# # Verify the build output
# RUN ls -al /app/build 

# # Stage 2: Serve with Nginx
# FROM nginx:1.15.8-alpine

# # Copy the build files from the previous stage
# COPY --from=build /app/build  /usr/share/nginx/html

# # Expose port 80
# EXPOSE 8005

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

#------------------------------------------------------------------------------------

# # Base image for the container
# FROM node:alpine AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app (adjust the command if needed)
# RUN npm run build

# # Switch to a lightweight runtime image
# FROM node:alpine

# # Copy only the build folder from the builder stage
# COPY --from=builder /app/build /app

# # Expose port 8005
# EXPOSE 8005

# # Set the start command (adjust if your app uses a different command)
# CMD [ "npm", "start" ]


#-------------------------------------------------------------------

# Use an official Node.js runtime as a parent image

# FROM node:alpine

# # Set the working directory in the container

# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory

# COPY package*.json ./

# # Install project dependencies

# RUN npm install

# # Copy the rest of the application code to the working directory

# COPY . .

# # Build the React application

# RUN npm run build

# # Expose the port on which your React app will run (default is 3000)

# EXPOSE 8005

# # Start the React app

# CMD ["npm", "start"]


#----------------------------------------------------------------

# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the build output to the Nginx HTML directory
COPY dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
