CREATE DATABASE database_users;

USE database_users;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    nickname VARCHAR(107) NOT NULL
);

ALTER TABLE users
 ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
DESCRIBE users;

-- familiaMembers
CREATE TABLE Familia_links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE Familia_links
    ADD PRIMARY KEY (id);

ALTER TABLE Familia_links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
ALTER TABLE Familia_links
    ADD principal_family VARCHAR(120) NOT NULL

ALTER TABLE Familia_links
    ADD user VARCHAR(150) NOT NULL;

ALTER TABLE Familia_links
    ADD files VARCHAR(170) NOT NULL;