RUN npm run build
RUN npm prune --production
docker system prune -a
docker build . -t elem15ten/nodejs-service
docker volume create --name nodemodules
docker build ./database -t elem15ten/nodejs-service-postgres
docker run -it elem15ten/nodejs-service
docker run -p 4000:4000 elem/nodejs-service
docker run -p 4000:4000  -v db-data:/database -v db-log:/database-logs elem15ten/nodejs-service npm run start
docker run -e POSTGRES_PASSWORD=postgres  -p 5432:5432 -it nodejs2022q2-service_postgres
docker exec -it [container-id] bash
docker-compose up --build
docker network create my-net
docker network rm my-net

docker tag nodejs2022q2-service_node elem15ten/nodejs-service
docker push elem15ten/nodejs-service

db:
\l -list of bases
\conninfo - port
\connect base-name
\dt - existed tables\
postgres=# CREATE TABLE users(id varchar(255), login varchar(255), version int, createdAt bigint, updatedAt bigint, password varchar(255));
postgres=# CREATE TABLE albums(id varchar(255), name varchar(255), year int, artistid varchar(255));
postgres=# CREATE TABLE artists(id varchar(255), name varchar(255), grammy boolean);
INSERT INTO artists (id, name, grammy) VALUES ('123j', 'John', true);
ALTER TABLE users ADD COLUMN password varchar(255);
ALTER TABLE albums ADD COLUMN aritstid varchar(255);

if old nestjs
  npm i --legacy-peer-deps @nestjs/typeorm typeorm pg