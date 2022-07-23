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

Enjoy this program!
_____________________________
Part 2

#Use with Docker

Install Docker

Use separate app & database:
1
Node app:
Download image elem/nodejs-service
Run command to create volumes: docker volume create db-data
                                docker volume create db-logs
Run command: docker run -p 4000:4000  -v db-data:/database -v db-log:/database-logs elem/nodejs-service npm run start:dev
Now you can use service with auto test - "npm test" or with swagger on address http://localhost:4000/api/
2
Postgres:
Download image elem/nodejs-service-postgres
Run command: docker run -e POSTGRES_PASSWORD=password  -p 4040:4000 elem/nodejs-service-postgres

Use with docker compose:

Run command: docker-compose up --build
Now both services are running.

To scan images for security vulnerabilities:
Check version with: docker scan --accept-license --version
Auth in docker hub with VS code extension 
Login in terminal: docker login -u username
password: Enter you docker password
Scan image: docker scan --file Dockerfile docker-scan:e2e 

To create your bridge run: docker network create my-net
Run image docker-compose up 
To connect you container with bright: docker network connect my-net [CONTAINER-ID] (get container id with command: docker ps)
To disconnect you container from bridge: docker network disconnect my-net [CONTAINER-ID]
To remove bridge: docker network rm my-net

To scan image for security vulnerabilities: npm run scan


