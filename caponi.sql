
-------------------------------
-- DB title: caponi_art_park --
-------------------------------

------------------------
--Table create scripts--
------------------------

--USERS TABLE--
BEGIN;
create TABLE users(
id SERIAL PRIMARY KEY,
first_name VARCHAR(20)NOT NULL,
last_name VARCHAR(20)NOT NULL,
username VARCHAR(20)NOT NULL,
password VARCHAR(200)NOT NULL,
email VARCHAR(200)NOT NULL,
user_type VARCHAR(20)NOT NULL
)
--SELECT * FROM users
--ROLLBACK
--COMMIT

--INFORMATION TABLE--
BEGIN;
CREATE TABLE information(
information_id SERIAL PRIMARY KEY,
description VARCHAR,
category VARCHAR NOT NULL
)
--SELECT * FROM information
--ROLLBACK
--COMMIT

--EVENTS TABLE--
BEGIN;
CREATE TABLE events(
event_id SERIAL PRIMARY KEY,
title VARCHAR NOT NULL,
date_time TIMESTAMP NOT NULL,
description VARCHAR NOT NULL,
notes VARCHAR NOT NULL,
category VARCHAR NOT NULL,
photo_url VARCHAR NOT NULL,
age_group VARCHAR,
price MONEY
)
--SELECT * FROM events
--ROLLBACK
--COMMIT

--MAP TABLE--
BEGIN;
CREATE TABLE map(
location_id SERIAL PRIMARY KEY,
location_name VARCHAR,
lat DECIMAL NOT NULL,
long DECIMAL NOT NULL,
reveal_type VARCHAR
)
--SELECT * FROM map
--ROLLBACK
--COMMIT

--ARTIFACT TABLE--
BEGIN;
CREATE TABLE artifact(
artifact_id SERIAL PRIMARY KEY,
type VARCHAR NOT NULL,
year VARCHAR,
material VARCHAR,
artist_name VARCHAR,
title VARCHAR,
description VARCHAR,
extended_description VARCHAR,
media_url VARCHAR,
view_count INTEGER
)
--SELECT * FROM artifact
--ROLLBACK
--COMMIT

--MAP_ARTIFACT_JOIN TABLE--
BEGIN;
CREATE TABLE map_artifact_join(
id SERIAL PRIMARY KEY,
artifact_id INTEGER REFERENCES artifact(artifact_id),
location_id INTEGER REFERENCES map(location_id),
priority INTEGER
)
--SELECT * FROM map_artifact_join
--ROLLBACK
--COMMIT



----------------------------
------create mock data------
----------------------------

--ADD RECORDS TO INFORMATION--
BEGIN;
INSERT INTO information (description, category) VALUES ('don''t climb on the stuff', 'rules');
INSERT INTO information (description, category) VALUES ('don''t jump the fence Dev', 'rules');
INSERT INTO information (description, category) VALUES ('bathrooms are in the trees', 'facilities');
--SELECT * FROM information
--ROLLBACK
--COMMIT

--ADD RECORDS TO MAP--
BEGIN;
INSERT INTO map (location_name, lat, long, reveal_type) VALUES ('Mr Oak Tree', 44.8043, 93.1548, 'static');
--SELECT * FROM map
--ROLLBACK
--COMMIT

--ADD RECORDS TO ARTIFACT
BEGIN;
INSERT INTO artifact (type, year, material, artist_name, title, description, extended_description, media_url, view_count) VALUES ('Mr Oak Tree', '1900', 'wood', 'Mother Nature', 'the wooden tree','The Grand Old Tree', 'If you cut me down you can count my rings', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTespJaKoSogP6_mJe0qFlJAgEM4AmLVG0d9jJdw32Qe3ZiFg', 4321);
--SELECT * FROM artifact
--ROLLBACK
--COMMIT

--ADD RECORDS TO MAP_ARTIFACT_JOIN
BEGIN;
INSERT INTO map_artifact_join (artifact_id, location_id, priority) VALUES (1, 1, 1);
--SELECT * FROM map_artifact_join
--ROLLBACK
--COMMIT

--ADD RECORDS TO EVENTS
BEGIN;
INSERT INTO events (title, date_time, description, notes, category, photo_url, age_group, price) VALUES ('Its the event', '5/4/2018 08:00:00', 'This is the description of the event', 'Notes go here', 'Workshop', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Xlf4l624HKjzTaa91X-p9_AWv2FzwhuDHS4ce0xETpXCJWlpXA', '0-12', 12.75);
--SELECT * FROM events
--ROLLBACK
--COMMIT


