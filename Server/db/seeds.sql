DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS meals;

CREATE TABLE users(
    userid SERIAL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    PRIMARY KEY(userid),
    UNIQUE (email),
    UNIQUE (username)
);

CREATE TABLE foods (
    foodid SERIAL,
    foodname VARCHAR(150),
    landuse FLOAT,
    farm FLOAT,
    processing FLOAT,
    transport FLOAT,
    packing FLOAT,
    retail FLOAT,
    total_emissions FLOAT,
    total_water FLOAT,
    PRIMARY KEY (foodid)
)

CREATE TABLE meals(
    userid INT,
    foodid INT,
    date DATE,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (foodname) REFERENCES foods(foodid)
)

INSERT INTO users(username, email, password)
VALUES(
    'dummyuser',
    'dummyemail@gmail.com',
    'dummypass'
);