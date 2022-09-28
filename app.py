import numpy as np

import sqlalchemy
#import psycopg2
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:password@localhost/olympics")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

print(Base.classes.keys())
# Save reference to the table
Athlete = Base.classes.athlete_events


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"/api/v1.0/athlete"
        
    )

@app.route("/api/v1.0/athlete")
def athlete():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    #Return a list of passenger data including the name, age, and sex of each passenger
    # Query all passengers
    results = session.query(Athlete.athlete_id, Athlete.name, Athlete.age, Athlete.sex, 
    Athlete.height, Athlete.weight, Athlete.team, Athlete.noc, Athlete.games, 
    Athlete.year, Athlete.season, Athlete.city, Athlete.sport, Athlete.event, 
    Athlete.medal, Athlete.lat, Athlete.lng, Athlete.noc_country, Athlete.country_lat, Athlete.country_long).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_athletes = []
    for id, name, age, sex, height, weight, team, noc, games, year, season, city, sport, event, medal, lat, lng, noc_country, country_lat, country_long in results:
        athletes_dict = {}
        athletes_dict["id"] = id
        athletes_dict["name"] = name
        athletes_dict["age"] = age
        athletes_dict["sex"] = sex
        athletes_dict["height"] = height
        athletes_dict["weight"] = weight
        athletes_dict["team"] = team
        athletes_dict["noc"] = noc
        athletes_dict["games"] = games
        athletes_dict["year"] = year
        athletes_dict["season"] = season
        athletes_dict["city"] = city
        athletes_dict["sport"] = sport
        athletes_dict["event"] = event
        athletes_dict["medal"] = medal
        athletes_dict["lat"] = lat
        athletes_dict["lng"] = lng
        athletes_dict["noc_country"] = noc_country
        athletes_dict["country_lat"] = country_lat
        athletes_dict["country_long"] = country_long
        all_athletes.append(athletes_dict)
    return jsonify(all_athletes[0])


if __name__ == '__main__':
    app.run(debug=True)

