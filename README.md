# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


## Use
You can run Postman and manual test all requests. For example: 
POST to localhost:3000/artist with body: 
{
    "name": "Jan",
    "grammy": true   
} 
created artist with name "Jan"
then you can get all users with 
GET to localhost:3000/artist
then copy "Jan" id from response and create new request 
GET to localhost:3000/artist/id
So you can work with every entities.

To create user -
POST to localhost:3000/user with body: 
{
    "name": "Jan",
    "password": "12345"
} 
To get users with id's - 
GET to localhost:3000/user
To update password -
PUT to localhost:3000/user/id with body:
{
    "oldPassword": "12345",
    "newPassword": "54321"
}

____________________________
Part 2

#Use with Docker

Install Docker

Use separate app & database:    

1   

Node app:   

Download image: docker pull elem15ten/nodejs-service:latest 

Run command to create volumes: docker volume create db-data 

                                docker volume create db-logs    

Run command: docker run -p 4000:4000  -v db-data:/database -v db-log:/database-logs elem15ten/nodejs-service npm run start:dev  

Now you can use service with auto test - "npm test" or with swagger on address http://localhost:4000/api/   

2   

Postgres:   

Create database image: docker build ./database -t elem15ten/postgres-service

Run command: docker run -e POSTGRES_PASSWORD=postgres  -p 4040:4000 elem15ten/nodejs-service


Use with docker compose:    


Run command: docker-compose up --build  

Now both services are running.  


To scan images for security vulnerabilities:    

Check version with: docker scan --accept-license --version  

Auth in docker hub with VS code extension   

Login in terminal: docker login -u username 

password: Enter you docker password 

Scan image: docker scan --file Dockerfile docker-scan:e2e   


To create your bridge run: 

docker network create my-net 

Run image:

docker-compose up     

To connect you container with bridge: docker network connect my-net [CONTAINER-ID] (get container id with command: docker ps)   

To disconnect you container from bridge: docker network disconnect my-net [CONTAINER-ID]    

To remove bridge: docker network rm my-net  


To scan image for security vulnerabilities: npm run scan    
________________________________________

Part 3

# Postgres + TypeRM

Now you can start to use this app and get all entities from data base Postgres. 

To local use download repo:

git clone https://github.com/elem15/nodejs2022Q2-service.git

cd nodejs2022Q2-service

git checkout part-3

create empty folder /pgdata for database volumes.

npm i

make sure:
    the file ormconfig.ts contains: 

    // host: "postgres", //docker bridge

    host: process.env.POSTGRES_HOST as string, //local

    the file src/create-tables contains: 

    // host: 'postgres', // docker bridge

    host: process.env.POSTGRES_HOST as string, //local

    local data base started on port 5432.

    if you previously test other app, please manually clear you data base.

    manually drop all tables in psql terminal with command *** from file COMMANDS.md.

npm run start:dev

npm run test - auto test

http://localhost:4000/api/ - test with swagger.


You also can use Docker.

Install Docker local

docker pull elem15ten/nodejs-service:latest 

sorry, this may not work, because according to the condition of the assignment, the repository is private

docker pull elem15ten/postgres-service:latest 

docker-compose up 
 
or if you can't to pull images from docker hub:

make sure:

    the file ormconfig.ts contains: 

    host: "postgres", //docker bridge

    // host: process.env.POSTGRES_HOST as string, //local

    the file src/create-tables contains: 

    host: 'postgres', // docker bridge

    // host: process.env.POSTGRES_HOST as string, //local

docker-compose up --build 

to start auto test: 

npm run test 

to test with swagger:

http://localhost:4000/api/ 

Migrations

To use migrations change file ormconfig.ts.

synchronize: true,

Now you can change entity files, add or remove columns and DB will updated.

But in this mode many auto-tests will fail with 500 error.

To restore tests work you need:

synchronize: false,

manually drop all tables in psql terminal with command *** from file COMMANDS.md.

_____________________________________________________


Enjoy this great program ;)


