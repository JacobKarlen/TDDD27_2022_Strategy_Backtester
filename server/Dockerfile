FROM node:16-alpine3.11 as base

# Create the app directory
WORKDIR /usr/src/app

# Install application dependencies
COPY package*.json ./
RUN npm i

# Bundle application source
COPY . .

FROM base as production
ENV NODE_PATH=./build

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]