
FROM node:16.14-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json .
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD ["npm", "start"]