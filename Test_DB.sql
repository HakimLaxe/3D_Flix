DROP DATABASE IF EXISTS `3D-Flix`;
CREATE DATABASE IF NOT EXISTS `3D-Flix`;
USE `3D-Flix`;

CREATE TABLE IF NOT EXISTS User(
Name VARCHAR(255) NOT NULL,
Surname VARCHAR(255) NOT NULL,
Nickname VARCHAR(255) NOT NULL,
PasswordHash VARCHAR(255) NOT NULL,
Mail VARCHAR(255) NOT NULL,
City VARCHAR(255) NOT NULL,
Prov VARCHAR(255) NOT NULL,
PRIMARY KEY(`Nickname`)
);

CREATE TABLE IF NOT EXISTS ValidateUser(
Nickname VARCHAR(255) NOT NULL,
ActivationCode VARCHAR(255) NOT NULL,
PRIMARY KEY(`Nickname`)
);

INSERT INTO User(Name,Surname, NickName, PasswordHash, Mail, City, Prov)
VALUES("Mario","Rossi","RossiM01","$2a$10$vhziCJuwkzAykzOyVIoQnuAj6A/2wBJRPA0cKMToFY3DTaRU0wL3K","MarioRossi@mail.com","Roma","RO");

INSERT INTO User(Name,Surname, NickName, PasswordHash, Mail, City, Prov)
VALUES("Filippo","Bianchi","BFlixy","$2a$10$PoB30TiiUdrMp6UmIdO9r.bkJXedWx.WNgksv0I/h5cATdW0.Bu02","BianchiFil@mail.com","Milano","MI");