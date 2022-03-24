FROM node:16-alpine3.11

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json .
RUN npm i

# Bundle application source
COPY . .

EXPOSE 4200
CMD [ "npm", "start" ]
