# Storefront Backend Project

## Setup

### PostgreSQL

Make sure that you have PostgreSQL installed, otherwise install [PostgreSQL](https://www.postgresql.org) from their homepage.

```
postgres --version
```

Start Postgres with

```
sudo -u postgres -i
```

and enter the Postgres terminal with

```
psql postgres
```

Create the database

```
CREATE DATABASE storefront_dev;
```

```
CREATE DATABASE storefront_test;
```

Connect to the database

```
\c storefront_dev
```

Display the tables (no relations should be found)

```
\dt
```

### Install the node modules

```
npm install
```

you can start this API with

```
npm run start
```

The server runs on localhost:3000 by default.

## Routes and Database Schemas

[Google Doc w/ Endpoint Info](https://docs.google.com/document/d/1zOQ4KsdVr0wzUXLTnyZ78oaQMspr_5aCYGScruuyDYw/edit?usp=sharing)

```
/orders
GET  http://localhost:3000/orders
GET  http://localhost:3000/orders/:id
POST  http://localhost:3000/orders
POST  http://localhost:3000/orders/:id/products
DELETE   http://localhost:3000/orders/:id
```

```
/products
GET  http://localhost:3000/products
GET  http://localhost:3000/products/:id
GET  http://localhost:3000/products/categories
POST  http://localhost:3000/products
DELETE   http://localhost:3000/products/:id
```

```
/users
GET  http://localhost:3000/users
GET  http://localhost:3000/users/:id
POST  http://localhost:3000/users
POST   http://localhost:3000/users/login
```
