RUN npm run build
RUN npm prune --production
docker build . -t elem/nodejs-service
docker build ./database -t elem/nodejs-service-postgres
docker system prune -a
docker run -it elem/nodejs-service
docker run -p 4000:4000 elem/nodejs-service
docker run -e POSTGRES_PASSWORD=password  -p 4040:4000 elem/nodejs-service-postgres
docker-compose up 