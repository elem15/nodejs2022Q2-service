FROM node:16-alpine
WORKDIR /src
ADD package.json /src 
COPY package*.json .
RUN npm i --silent
ADD . /src 
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "start" ]

