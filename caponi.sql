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


