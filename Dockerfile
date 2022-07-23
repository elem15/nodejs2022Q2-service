FROM node:16.14-alpine3.15
WORKDIR /the/workdir/path
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "run", "start:prod" ]

