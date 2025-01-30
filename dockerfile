FROM node:16-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the source code
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the GraphQL server
CMD ["node", "App.js"]