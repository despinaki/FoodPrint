DROP TABLE IF EXISTS users;

CREATE TABLE users(
    userid SERIAL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    PRIMARY KEY(userid),
    UNIQUE (email),
    UNIQUE (username)
);

INSERT INTO users(username, email, password)
VALUES(
    'dummyuser',
    'dummyemail@gmail.com',
    'dummypass'
);