CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(64) NOT NULL
);

INSERT INTO categories (category) VALUES ('Category 1');
INSERT INTO categories (category) VALUES ('Category 2');
INSERT INTO categories (category) VALUES ('Category 3');

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    description VARCHAR(64) NOT NULL,
    image VARCHAR(250) NOT NULL,
    cat_id bigint REFERENCES categories(id)
);


INSERT INTO products (name, price, description, image, cat_id) VALUES
('Green Cup', 25, 'Cups', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', 1),
('Brown Cup', 25, 'Cups', 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', 1),
('Silver Cup', 25, 'Cups', 'https://images.unsplash.com/photo-1616170919057-5946e5f0c9f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80', 2),
('Blue Cup', 25, 'Cups', 'https://images.unsplash.com/photo-1568395216634-ab1b1e848751?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 2),
('White Cup', 25, 'Cups', 'https://images.unsplash.com/photo-1620911626955-c6227a886383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80', 3),
('Yellow Cup', 25, 'Cups', 'https://images.unsplash.com/photo-1616740540792-3daec604777d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80', 3);


