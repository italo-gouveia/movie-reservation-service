# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy the rest of the application files
COPY . .

# Make the start.sh script executable
RUN chmod +x start.sh

# Expose port 3000
EXPOSE 3000

# Define the command to run the start.sh script
CMD ["./start.sh"]
