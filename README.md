# Storefront Backend Project

## About

This project is for the [Udacity Full Stack JavaScript Developer Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067).

### Project Summary

Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.

Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.

### Requirements

Your task is to build an API for a shopping application.

- Draft a database schema that covers all the data requirements.
- Draft a map of endpoints to expose for the frontend.

#### Database Setup
- Create a connection to a Postgres database from the provided Node application.
- Add tables and columns according to the database schema doc from step 1.

####Create Models
- Create models that facilitate CRUD operations on the database tables.
- Create a test suite for each model in Jasmine.

####Create API Endpoints
- Create handler files for each model.
- In each handler file, create RESTful endpoints for each model method.
- Create a test suite that covers each endpoint with Jasmine.


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

Create 2 databases

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
[Google Doc w/ Database Schema](https://docs.google.com/drawings/d/1zVMoyXMUnBefzrrQ9-4dQT16xdZ_k9SpocVqudexGBo/edit?usp=sharing)

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
