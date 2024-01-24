# official Node.js image parent image
FROM node:latest

# working directory
WORKDIR /usr/src/app

# Copy both package.json AND package-lock.json
COPY package*.json ./

# Copy all local files into the image
COPY . .

# Install specific global and local packages for this project
RUN npm install @npmcli/fs

# Install all dependencies
RUN npm install

# Define the command to run the app
CMD ["node", "index.js"]

# Expose the port the app runs in
EXPOSE 3000