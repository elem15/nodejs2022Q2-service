RUN npm run build
docker run -d --name container-name alpine watch "date >> /var/log/date.log"
RUN npm prune --production
docker system prune -a
docker build . -t elem15ten/nodejs-service
docker volume create --name nodemodules
docker build ./database -t elem15ten/nodejs-service-postgres
docker run -it elem15ten/nodejs-service
docker run -p 4000:4000 elem15ten/nodejs-service
docker run -p 4000:4000  -v db-data:/database -v db-log:/database-logs elem15ten/nodejs-service npm run start
docker run -p 4000:4000  -v db-data:/database -v db-log:/database-logs nodejs2022q2-service_node npm run start:dev
docker run -e POSTGRES_PASSWORD=postgres  -p 5432:5432 -it nodejs2022q2-service_postgres
docker run  --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e PGDATA=/var/lib/postgresql/data/pgdata -d -v root:/var/lib/postgresql/data elem15ten/postgres-service 

postgres --single -D /var/lib/postgresql/data/pgdata -U postgres

docker run --name habr-pg-13.3 -p 5432:5432 -e POSTGRES_USER=habrpguser -e POSTGRES_PASSWORD=pgpwd4habr -e POSTGRES_DB=habrdb -e PGDATA=/var/lib/postgresql/data/pgdata -d -v "/absolute/path/to/directory-with-data":/var/lib/postgresql/data -v "/absolute/path/to/directory-with-init-scripts":/docker-entrypoint-initdb.d postgres:13.3

docker exec -it [container-id] bash

docker-compose up --build
docker-compose down
docker compose up postgres -d

docker network create my-net
docker network rm my-net
docker commit 82c9ab69e168 nodejs2022q2-service_postgres
docker tag nodejs2022q2-service_node elem15ten/nodejs-service
docker push elem15ten/nodejs-service
docker tag nodejs2022q2-service_postgres elem15ten/postgres-service
docker push elem15ten/postgres-service

db:
psql -U postgres
\l -list of bases
\conninfo - port
\connect base-name
\dt - existed tables\
CREATE TABLE users(id varchar(255), login varchar(255), version int, createdAt bigint, updatedAt bigint, password varchar(255));
CREATE TABLE albums(id varchar(255), name varchar(255), year int, artistid varchar(255));
CREATE TABLE artists(id varchar(255), name varchar(255), grammy boolean);
INSERT INTO artists (id, name, grammy) VALUES ('123j', 'John', true);
ALTER TABLE users ADD COLUMN password varchar(255);
ALTER TABLE albums ADD COLUMN aritstid varchar(255);

***
DROP TABLE users;
DROP TABLE albums;
DROP TABLE artists;
DROP TABLE tracks;
DROP TABLE artistsIds;
DROP TABLE albumsIds;
DROP TABLE tracksIds;



if old nestjs
  npm i --legacy-peer-deps @nestjs/typeorm typeorm pg