RUN npm run build
RUN npm prune --production
docker build . -t elem/nodejs-service
docker system prune -a
docker run -it elem/nodejs-service
docker run -p 4000:4000 elem/nodejs-service