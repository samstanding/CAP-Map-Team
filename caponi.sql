------------------------
--Table create scripts--
------------------------

--USERS TABLE--
--BEGIN;
create TABLE users(
id SERIAL PRIMARY KEY,
first_name VARCHAR(20)NOT NULL,
last_name VARCHAR(20)NOT NULL,
username VARCHAR(20)NOT NULL,
password VARCHAR(200)NOT NULL,
email VARCHAR(200)NOT NULL,
user_type VARCHAR(20)
);
--SELECT * FROM users
--ROLLBACK
--COMMIT

--GUEST_USERS TABLE--
--BEGIN;
create TABLE guest_users(
id SERIAL PRIMARY KEY,
name VARCHAR,
email VARCHAR(200)
);
--SELECT * FROM guest_users
--ROLLBACK
--COMMIT

--INFORMATION TABLE--
--BEGIN;
CREATE TABLE information(
id SERIAL PRIMARY KEY,
description VARCHAR,
category VARCHAR 
);
--SELECT * FROM information
--ROLLBACK
--COMMIT

--EVENTS TABLE--
--BEGIN;
CREATE TABLE events(
id SERIAL PRIMARY KEY,
title VARCHAR NOT NULL,
date DATE NOT NULL,
time TIME NOT NULL,
description VARCHAR NOT NULL,
notes VARCHAR NOT NULL,
category VARCHAR NOT NULL,
photo_url VARCHAR NOT NULL,
age_group VARCHAR,
price MONEY
);
--SELECT * FROM events
--ROLLBACK
--COMMIT

--MAP TABLE--
--BEGIN;
CREATE TABLE map(
id SERIAL PRIMARY KEY,
location_name VARCHAR,
lat DECIMAL NOT NULL,
long DECIMAL NOT NULL,
reveal_type VARCHAR
);
--SELECT * FROM map
--ROLLBACK
--COMMIT

--ARTIFACT TABLE--
--BEGIN;
CREATE TABLE artifact(
id SERIAL PRIMARY KEY,
type VARCHAR NOT NULL,
year VARCHAR,
material VARCHAR,
artist_name VARCHAR,
title VARCHAR,
description VARCHAR,
extended_description VARCHAR,
media_url VARCHAR,
view_count INTEGER
);
--SELECT * FROM artifact
--ROLLBACK
--COMMIT

--MAP_ARTIFACT_JOIN TABLE--
--BEGIN;
CREATE TABLE map_artifact_join(
id SERIAL PRIMARY KEY,
artifact_id INTEGER REFERENCES artifact(id),
location_id INTEGER REFERENCES map(id),
main_photo BOOLEAN,
priority INTEGER
);
--SELECT * FROM map_artifact_join
--ROLLBACK
--COMMIT


----------------------------
------create mock data------
----------------------------

--ADD RECORDS TO INFORMATION--
--BEGIN;
INSERT INTO information (description, category) VALUES ('don''t climb on the stuff', 'rules');
INSERT INTO information (description, category) VALUES ('don''t jump the fence Dev', 'rules');
INSERT INTO information (description, category) VALUES ('bathrooms are in the trees', 'facilities');
--SELECT * FROM information
--ROLLBACK
--COMMIT

--ADD RECORDS TO EVENTS
--BEGIN;
INSERT INTO events (title, date, time, description, notes, category, photo_url, age_group, price) VALUES ('Its the event', '5/4/2018', '08:00:00', 'This is the description of the event', 'Notes go here', 'Workshop', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Xlf4l624HKjzTaa91X-p9_AWv2FzwhuDHS4ce0xETpXCJWlpXA', '0-12', 12.75);
--SELECT * FROM events
--ROLLBACK
--COMMIT

--ADDING RECORDS TO ARTIFACTS--
--BEGIN;
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('sculpture', '1776', 'stone', 'Tony Caponi', 'Pompei', 'Description of Pompei', 'Extended description of Pompei', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 45);
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('photo', '1886', 'image', 'Lizz', 'Copper', 'The wire is copper', 'It''s copper thing', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 55);
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('poem', '1996', 'words', 'Ryan', 'Roses are red', 'Here I will talk about the description', 'More description here', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 65);
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('writing', '2006', 'words', 'Crouton', 'Something writen', 'Here I will talk about the description', 'More description here', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 75);
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('anecdote', '2116', 'words', 'Sam', 'Here''s a anecdote for ya!', 'Here I will talk about the description', 'More description here', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 85);
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('video', '2226', 'flipbook of images', 'Ryan', 'Roses are red', 'Here I will talk about the description', 'More description here', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 95);
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('bathroom', '2336', 'plastic', 'John', 'Bathroom', 'Description', 'More description here', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 105);
--SELECT * FROM artifact
--ROLLBACK
--COMMIT

--ADD RECORDS TO MAP--
--BEGIN;
INSERT INTO map (location_name, lat, long, reveal_type) VALUES ('Tree tag', 44.80622527659387, -93.15247468659017, 'static');
INSERT INTO map (location_name, lat, long, reveal_type) VALUES ('Sculpture', 44.804737488780916, -93.15390857876572, 'static');
INSERT INTO map (location_name, lat, long, reveal_type) VALUES ('Bathroom', 44.80557668492646, -93.15353089020881, 'static');
INSERT INTO map (location_name, lat, long, reveal_type) VALUES ('Cornerstone', 44.80550024196953, -93.1520582736406, 'static');
INSERT INTO map (location_name, lat, long, reveal_type) VALUES ('Place', 44.80437132534087, -93.19697345615663, 'static');
INSERT INTO map (location_name, lat, long, reveal_type) VALUES ('Place 2', 44.80622527659387, -93.15247468659017, 'static');
--SELECT * FROM map;
--SELECT * FROM artifact;
--ROLLBACK
--COMMIT

--ADD RECORDS TO MAP_ARTIFACT_JOIN
--BEGIN;
INSERT INTO map_artifact_join (artifact_id, location_id, main_photo) VALUES (1, 1, true);
INSERT INTO map_artifact_join (artifact_id, location_id, main_photo) VALUES (2, 1, true);
INSERT INTO map_artifact_join (artifact_id, location_id, main_photo) VALUES (3, 2, true);
INSERT INTO map_artifact_join (artifact_id, location_id, main_photo) VALUES (4, 3, true);
INSERT INTO map_artifact_join (artifact_id, location_id, main_photo) VALUES (5, 4, false);
INSERT INTO map_artifact_join (artifact_id, location_id, main_photo) VALUES (6, 5, false);
INSERT INTO map_artifact_join (artifact_id, location_id, main_photo) VALUES (7, 6, false);
--SELECT * FROM map_artifact_join
--ROLLBACK
--COMMIT

--ADD GUEST_USER
--BEGIN;
INSERT INTO guest_users (name, email) VALUES ('Frank E.', 'frank@email.com');
INSERT INTO guest_users (name, email) VALUES ('Bill B.', 'bill@email.com');
--SELECT * FROM guest_users
--ROLLBACK
--COMMIT