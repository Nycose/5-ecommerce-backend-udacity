# Storefront Backend Project

## Getting Started

Install dependencies - npm install

### Required Technologies

This application makes use of the following libraries:

-   Postgres for the database
-   Node/Express for the application logic
-   dotenv from npm for managing environment variables
-   db-migrate from npm for migrations
-   jsonwebtoken from npm for working with JWTs
-   jasmine from npm for testing

For the purposes of this project submission, I have included database info in the .env file. There you will find information about the port and any credentials. You will also find the ENVI variable where you can change from test to production databases.

### 1. Create Postgres database

For this api to work, you will need to create a psql user as well as a psql database on your local machine titled "storefront_dev" and another "storefront_test":

CREATE USER app WITH PASSWORD 'Welcome1';

CREATE DATABASE storefront_dev;
CREATE DATABASE storefront_test;

Connect to database and grant permissions:

\c storefront_dev
GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO app;

\c storefront_test
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO app;

### 2. Run database migrations

To run database migrations and create the tables that will be used, make sure to have db-migrate installed globally on your machine and run the following scripts:

npm run test
npm run start

The following tables should have been created in the database

-   users
-   products
-   orders
-   order_products

### 3. Interacting with API

Once the db is setup, you can fire up Postman and send some requests.

Many of the routes will require a JWT for authentication so be sure to go ahead and create a user by sending a POST request to '/users'
Example request body:
{
"username": "jdoe",
"password_digest": "Welcome"
}

The server should respond with your JWT. Go ahead and copy the JWT and add it to your Postman headers. Here's an example of how your header should be formatted on request that require auth:

Accept:application/json
Content-Type:application/json
Authorization:Bearer token

### User endpoints

-   **index [token required]:** '/users' [GET]
-   **show [token required]:** '/users/:userid' [GET]
-   **create [token required]:** '/users' [POST]
    {
    "username": "jdoe",
    "password": "welcome"
    }

### Product endpoints

-   **index:** '/products' [GET]
-   **show:** '/products/:id' [GET]
-   **products by category:** '/products/categories/:cat' [GET]
-   **product categories:** '/products/categories' [GET]
-   **delete product:** 'products/:id' [DELETE]
-   **create [token required]:** '/products' [POST]
    {
    "name": "blue sweater",
    "price": 25,
    "category": "apparel"
    }

### Order endpoints

-   **show [token required]:** '/orders/:id' [GET]
-   **Current Order by user [token required]:** '/orders/users/:userid' [GET]
-   **Add product to order:** '/orders/:id/products' [POST]
    {
    "name": "blue sweater",
    "price": 25,
    "category": "apparel"
    }

### Order endpoints

GET http://localhost:3000/orders

[
{
"id": 1,
"status": "open",
"user_id": "1"
}
]

GET http://localhost:3000/orders/:id

{
"id": 1,
"status": "open",
"user_id": "1"
}

POST http://localhost:3000/orders {"status": "open", "user_id": "1"}

{
"id": 2,
"status": "open",
"user_id": "1"
}

POST http://localhost:3000/orders/:id/products {"productId": 1, "quantity": 3}

{
"id": 1,
"quantity": 3,
"order_id": "1",
"product_id": "1"
}

DELETE http://localhost:3000/orders/:id

{
"id": 1,
"status": "open",
"user_id": "1"
}

### Product endpoints
