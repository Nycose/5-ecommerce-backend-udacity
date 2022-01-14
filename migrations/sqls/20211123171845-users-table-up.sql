CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR, 
    last_name VARCHAR,
    username VARCHAR, 
    password VARCHAR, 
    is_admin BOOLEAN
);

INSERT INTO users(first_name, last_name, username, password, is_admin) 
VALUES('Mason', 'Crawford', 'mcrawford', 'welcome', true);