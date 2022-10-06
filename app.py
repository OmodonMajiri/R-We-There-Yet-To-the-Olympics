from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, request, render_template

#################################################
# Database Setup
#################################################

engine = create_engine("postgresql://postgres:sqladmin@localhost/olympics")

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
def index():
    return render_template('index.html')

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
    return jsonify(all_athletes)

@app.route("/api/v1.0/years")
def years():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.year).distinct()
    years = [r.year for r in results.order_by(Athlete.year)]
    return jsonify(years)

@app.route("/api/v1.0/olympic/<year>")
def olympic_year(year):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.athlete_id, Athlete.name, Athlete.age, Athlete.sex,
    Athlete.height, Athlete.weight, Athlete.team, Athlete.noc, Athlete.games,
    Athlete.year, Athlete.season, Athlete.city, Athlete.sport, Athlete.event,
    Athlete.medal, Athlete.lat, Athlete.lng, Athlete.noc_country, Athlete.country_lat, Athlete.country_long).filter(Athlete.year == year)
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
    return jsonify(all_athletes)

@app.route("/api/v1.0/country/total_medals/<year>")
def country_medal(year):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.noc_country, func.count(Athlete.noc_country)).filter(Athlete.year == year).group_by(Athlete.noc_country).order_by(func.count(Athlete.noc_country).desc()).all()
    countries = []
    for country, medal_count in results:
        countries_dict = {}
        countries_dict["country"] = country
        countries_dict["total_medals"] = medal_count
        countries.append(countries_dict)
    return jsonify(countries)

@app.route("/api/v1.0/athlete/demographic/<year>")
def athlete_demographic(year):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.sex, Athlete.age, Athlete.height, Athlete.weight).filter(Athlete.year == year).all()
    athlete_sex = []
    for sex, age, height, weight in results:
        athlete_sex_dict = {}
        athlete_sex_dict["sex"] = sex
        athlete_sex_dict["age"] = age
        athlete_sex_dict["height"] = height
        athlete_sex_dict["weight"] = weight
        athlete_sex.append(athlete_sex_dict)
    return jsonify(athlete_sex)

@app.route("/api/v1.0/athlete/<sex>/demographic/<year>")
def athlete_sex(sex, year):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.sex, Athlete.age, Athlete.height, Athlete.weight).filter(Athlete.year == year).filter(Athlete.sex == sex).all()
    athlete_sex = []
    for sex, age, height, weight in results:
        athlete_sex_dict = {}
        athlete_sex_dict["sex"] = sex
        athlete_sex_dict["age"] = age
        athlete_sex_dict["height"] = height
        athlete_sex_dict["weight"] = weight
        athlete_sex.append(athlete_sex_dict)
    return jsonify(athlete_sex)


@app.route("/api/v1.0/athlete/demographic")
def all_athlete_demographic():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.name, Athlete.sex, Athlete.age, Athlete.height, Athlete.weight, Athlete.medal, Athlete.noc_country).distinct(Athlete.name)
    athlete_sex = []
    for name, sex, age, height, weight, medal, country in results:
        athlete_sex_dict = {}
        athlete_sex_dict["name"] = name
        athlete_sex_dict["sex"] = sex
        athlete_sex_dict["age"] = age
        athlete_sex_dict["height"] = height
        athlete_sex_dict["weight"] = weight
        athlete_sex_dict["medal"] = medal
        athlete_sex_dict["country"] = country
        athlete_sex.append(athlete_sex_dict)
    return jsonify(athlete_sex)

@app.route("/funfacts")
def funfacts():
    return render_template('funfacts.html')

@app.route("/tableData")
def tableData():
    return render_template('tableData.html')

@app.route("/api/v1.0/countries")
def countries():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.noc_country).distinct()
    years = [r.noc_country for r in results]
    return jsonify(years)

@app.route("/api/v1.0/country/total_medals_years/<noc_country>")
def country_medal_year(noc_country):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Athlete.noc_country, func.count(Athlete.noc_country), Athlete.year).filter(Athlete.noc_country == noc_country).group_by(Athlete.noc_country).group_by(Athlete.year).all()
    countries = []
    for country, medal_count, year in results:
        countries_dict = {}
        countries_dict["country"] = country
        countries_dict["total_medals"] = medal_count
        countries_dict["year"] = year
        countries.append(countries_dict)
    return jsonify(countries)


if __name__ == '__main__':
    app.run(debug=True)














