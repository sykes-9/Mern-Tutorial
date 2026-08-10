# Start with node.js 20 as base image
FROM node:20
# Create a folder for our app inside the container
WORKDIR /app
# Copy package.json first
COPY package*.json ./
#install dependencies
RUN npm install
#copy source code
COPY . .
#start the app
CMD ["npm", "run", "dev"]