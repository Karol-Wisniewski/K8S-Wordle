FROM node:alpine

WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

ENTRYPOINT [ "node", "./src/main.js" ]
