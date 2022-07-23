RUN npm run build
RUN npm prune --production
docker build . -t elem/nodejs-service
docker volume create --name nodemodules
docker build ./database -t elem/nodejs-service-postgres
docker system prune -a
docker run -it elem/nodejs-service
docker run -p 4000:4000 elem/nodejs-service
docker run -p 4000:4000  -v db-data:/database -v db-log:/database-logs elem15ten/nodejs-service npm run start:dev
`docker run -e POSTGRES_PASSWORD=password  -p 4040:4000 elem/nodejs-service-postgres`
docker-compose up 
docker network create my-net
docker network rm my-net

docker tag nodejs2022q2-service_node elem15ten/nodejs-service
docker push elem15ten/nodejs-service