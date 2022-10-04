# From Athens to Beijing: Visualizing the World's Greatest Athletes
## Project Rationale
<p> We decided to pick a project that would showcase the global history of countries worldwide, coming together to one location, and having some good friendly competitions during the Summer and Winter Olympic Games. Our goal is to visualize some patterns throughout the Olympic Games history. Some of the patterns presented are as follows: </p>

* How many athletes and nations participated throughout the history of the Olympics 
* What were the demographics of the athletes:
    - ID - Unique number for each athlete 
    - Name
    - Sex
    - Age 
    - Height (cm) 
    - Weight (kg) 
* What sports were part of the Olympics throughout history
* Which countries won the most medals(gold, silver, and bronze) 
* Amongst others as we dive deeper into the data

## Resources
* <p><a href="https://github.com/OmodonMajiri/R-We-There-Yet-To-the-Olympics ">GitHub Repository</a></p>
* Datasets:
	- <a href="https://www.kaggle.com/datasets/heesoo37/120-years-of-olympic-history-athletes-and-results">120 Years of Complete Olympic History
  	- <a href="https://www.kaggle.com/datasets/jonscheaffer/olympic-host-cities">Olympic Host Cities</a>
 
## Group Members
* Vedrana Basimamovic
* Stephen Jackson
* Hee Oh
* Bob Pickerel
* Andres Almarez
* Leon Lee
* Gary Groscost
* Brian Hall
* Michael Damas
* Vinika Patel
* Colleen Kearns

## Tasks Completed
### World Map
<p>The world map is located on the landing page showcasing all the markers for host cities throughout the history of the Olympics</p>
	
### Interactive Data
<p> There are two interactive data visuals on the landing page. One visual is a bar chart that represents the top 10 medal counts based on the year the user selects. The other is a line graph that represents the countries medal counts over the history of the Olympics.</p>

### Athletes Demographic Information

### Technologies used to build the Olympics Webpage:
```
- App Back-End: Python Flask | SQLAlchemy
- Database: MySQL 
- Data Visualization: Javascript | Plotly.js | D3.js 
- Front-End: HTML | Bootstrap | CSS
- Web-Scraping: Requests
```
## Our Inspiration
<p>To help inspire our creative fodder, we referenced some visualizations that would help with the roadmap of how we wanted our project to flow. Here are some of the visualizations we found to guide in the process:</p>
<img src="/Images/sports_qualify.png">
<img src="/Images/medal_count.png">
<img src="/Images/medal_rings.png">
<p>All images were downloaded from <a href="https://mediashift.org/2016/08/5-data-stories-olympic-games/">5 Data Stories You Can Tell about the Olympic Games</a></p>.

## Transformation Process
### Data Merging
<p> For this table, we combined both 120 Years of Complete Olympic History and the Olympic Host Cities data into one dataset where you can find <a href="olympics_data.csv">here</a>.</p>

<p> After merging the data, we analyzed it, and the following issues were identified:</p>
