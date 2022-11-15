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

CREATE TABLE Message (
  messageID INTEGER AUTO_INCREMENT,
  srcNickname VARCHAR(255) NOT NULL,
  destNickname VARCHAR(255) NOT NULL,
  messageContent VARCHAR(1024) NOT NULL,
  PRIMARY KEY(messageID, srcNickname, destNickname)
);

--NON SI SA SE SO GIUSTE, IMPLEMENTARE LA DIFFERENZA USER/PRINTER
/*CREATE TABLE IF NOT EXISTS PrinterIbanInfo(
  namePay VARCHAR(255) NOT NULL,
  ibanPay CHAR(27) NOT NULL,
  PRIMARY KEY('ibanPay'),
);

CREATE TABLE IF NOT EXISTS PrinterPPInfo(
  ppPay VARCHAR(255) NOT NULL,
)
*/

INSERT INTO User(Name,Surname, NickName, PasswordHash, Mail, City, Prov)
VALUES("Mario","Rossi","RossiM01","$2b$10$bog3ld9RVyCHqXt6iHhHRu7Fay14bwca6t.ApBS.6KR30m3VnXa1i","MarioRossi@mail.com","Roma","RO");

INSERT INTO User(Name,Surname, NickName, PasswordHash, Mail, City, Prov)
VALUES("Filippo","Bianchi","BFlixy","$2b$10$dqG1JZ/Yu9lElWFPIIp/GeNV8mb.HvviH0qAt9JJD.QTb9Uo7VUra","BianchiFil@mail.com","Milano","MI");

INSERT INTO Message(srcNickname,destNickname,messageContent)
VALUES("GinoPippo","Bart00","Ciao Bro"),("Bart00","GinoPippo","Weila"),("GinoPippo","Loooooca","Wewe"),("Loooooca","Bart00","Ohhhhhhhhhh"),
      ("Bart00","GinoPippo","Che si dice?"),("Loooooca","GinoPippo","Ma tu sei GinoPippo?"),("GinoPippo","Loooooca","Sisi sono io");