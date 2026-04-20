FROM node:18-alpine

RUN apk update && apk upgrade

WORKDIR /app

COPY . .

RUN npm install 

CMD [ "node","server.js" ]
