## **Todo list built with Nestjs , Graphql ,Postgresql with PrismaOrm**
**Description**
An application for managing day-to-day activities

**Running the application**
   The command below dockerizes the application as well as spins up a redis server and a postgres database
   

> to avoid errors make sure the database credentials in the .env matches the ones in the docker compose file

> if you intend to  use the postgres/redis that docker compose spins up make sure no instance of postgres/ redis  is currently running on your system else the application will attempt to connect with that 

    docker compose up
 
**Usage**
you can test the graphql api by using the graphql playground, simply open:

    http://localhost:3000/graphql


**Features**

 - All CRUD functionalities
 - pagination on the  findAllTasks query
 - Authentication and Authorisation using passport and jwt
 - caching using redis
 - ability to add sub tasks
 - update tasks status
 - Searching for tasks by title or description 
   
  **Optimisation Done**
 
 - indexed columns to improve  read time from the database 
 -    caching to improve response time/ latency
   
   **Tools and Technologies**
   
 - Nodejs
 - Nestjs(a nodejs framework)
 - Redis
 - Postgres
 - Prisma (an Object Relational Mapper /Object Document Mapper for database)
 - JWT (Authentication and Authorisation)
 - Docker /Docker compose
 - Typescript

**Improvement**
more features can be added to the application for example

 - setting priorities to tasks
 - categorising tasks
 - e.t.c
