# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   index: '/products' [GET]
-   show: '/products/:id' [GET]
-   products by category: '/products/categories/:cat' [GET]
-   product categories: '/products/categories' [GET]
-   delete product: 'products/:id' [DELETE]
-   create [token required]: '/products' [POST]
    {
    "name": "blue sweater",
    "price": 25,
    "category": "apparel"
    }

#### Users

-   index [token required]: '/users' [GET]
-   show [token required]: '/users/:userid' [GET]
-   create [token required] '/users' [POST]
    {
    "username": "jdoe",
    "password": "welcome"
    }

#### Orders

-   show [token required]: '/orders/:id' [GET]
-   Current Order by user [token required]: '/orders/users/:userid' [GET]
-   Add product to order: '/orders/:id/products' [POST]
    {
    "name": "blue sweater",
    "price": 25,
    "category": "apparel"
    }

## Data Shapes

#### Product

-   id
-   name
-   price
-   category

TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price integer NOT NULL,
category VARCHAR(64) NOT NULL
)

#### User

-   id
-   username
-   password_digest

TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100),
password_digest VARCHAR
)

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (open or complete)

TABLE orders (
id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id bigint REFERENCES users(id)
)

TABLE order_products (
id SERIAL PRIMARY KEY,
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)
)
