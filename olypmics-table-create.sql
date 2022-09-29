-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Olympic Database

CREATE TABLE athlete_events (
    id SERIAL PRIMARY KEY,
    athlete_id INT   NOT NULL,
    name VARCHAR   NOT NULL,
    sex VARCHAR   NOT NULL,
    age VARCHAR,
    height  VARCHAR,
    weight VARCHAR,
    team VARCHAR   NOT NULL,
    noc VARCHAR   NOT NULL,
    games VARCHAR   NOT NULL,
    year INT   NOT NULL,
    season VARCHAR   NOT NULL,
    city VARCHAR   NOT NULL,
    sport VARCHAR   NOT NULL,
    event VARCHAR   NOT NULL,
    medal VARCHAR   NOT NULL,
    lat VARCHAR   NOT NULL,
    lng VARCHAR   NOT NULL,
    noc_country VARCHAR   NOT NULL,  
    country_lat VARCHAR   NOT NULL,
    country_long VARCHAR   NOT NULL

);



