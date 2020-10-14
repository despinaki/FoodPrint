DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS meals CASCADE;

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
);

CREATE TABLE meals(
    userid INT,
    foodid INT,
    date DATE,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (foodid) REFERENCES foods(foodid)
);

INSERT INTO users(username, email, password)
VALUES(
    'dummyuser',
    'dummyemail@gmail.com',
    'dummypass'
);

-- COPY foods(foodname, landuse, farm, processing, transport, packing, retail, total_emissions, total_water)
-- FROM 'C:\Users\despi\Desktop\futureproof\FoodPrint\Server\db\Food_Production.csv'
-- DELIMITER ','
-- CSV HEADER;
-- ----------ACCESS DENIED USE \copy instead-------------
\copy foods(foodname, landuse, farm, processing, transport, packing, retail, total_emissions, total_water) FROM 'C:\Users\despi\Desktop\futureproof\FoodPrint\Server\db\Food_Production.csv' WITH DELIMITER ',' CSV HEADER