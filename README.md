
## **Todo list built with Nestjs , Graphql ,Postgresql with PrismaOrm**

**Description**

An application for managing day-to-day activities

**Running the application**

The command below dockerizes the application as well as spins up a redis server and a postgres database

> to avoid errors make sure the database credentials in the .env matches the ones in the docker compose file

> if you intend to use the postgres that docker compose spins up make sure the port is different that which your local postgres server runs else prisma will attempt to connect with that

    cd into the app directory

to spin up postgres with docker compose

 
    docker compose up -d --build
    
install dependencies


    yarn install

generate and migrate tables to db


    npx prisma generate

    npx prisma migrate dev --name init

start application

    yarn run start:dev


**Usage**

you can test the graphql api by using the graphql playground, simply open:

    http://localhost:3000/graphql



**Features**

- All CRUD functionalities
- pagination on the findAllTasks query
- Authentication and Authorisation using passport and jwt
- caching using nestjs cache
- ability to add sub tasks
- update tasks status
- Searching for tasks by title or description

  **Optimisation Done**

- indexed columns to improve read time from the database
- caching to improve response time/ latency

**Tools and Technologies**

- Nodejs
- Nestjs(a nodejs framework)
- nest cache
- Postgres
- Prisma (an Object Relational Mapper /Object Document Mapper for database)
- JWT (Authentication and Authorisation)
- Docker /Docker compose
- Typescript

**Improvement**
more features can be added to the application for example

- setting priorities to tasks
- categorising tasks
- redis store can be user for the cache manager
- e.t.c
