# leaflet-challenge

## Webpage

Unable to host index.html on github.io without error since mapbox.com requires an `API_KEY` and mine is not going to be shared on github.

The webpage currently is defaulted to a light view, with the full 1-9 Richter scale in place, pulling earthquake data from [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) from the last 7 days. The map is created using [mapbox](https://www.mapbox.com/) and [leaflet](https://leafletjs.com/).

To change the date range of the earthquakes, just select a different 'const url...' in the [logic.js](https://github.com/meielerol/leaflet-challenge/blob/main/static/js/logic.js) file.
* `urlLastHour` = last 60 minutes of earthquake data
* `urlLastDay` = last 24 hours of earthquake data
* `urlLast7Days` = last 7 days of earthquake data
* `urlLast30Days` = last 30 days of earthquake data

The [colors.xlsx](https://github.com/meielerol/leaflet-challenge/blob/main/static/reference/colors.xlsx) in the reference folder was used to figure out the color scale for the legend and earthquake markers.

## Screenshots

__Western Hemisphere View__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/western-hemisphere_light.png" alt="Western Hemisphere Earthquakes"></p>

__Eastern Hemisphere View__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/eastern-hemisphere_light.png" alt="Eastern Hemisphere Earthquakes"></p>

__Legend__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/legend_light.png" alt="Legend"></p>

__Layers Selection__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/layers-selector.png" alt="Layer Selector"></p>

__Info Box__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/6.3-Richter_Popup.png" alt="Info Popup"></p>

__Pacific Islands__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/pacific-islands_dark.png" alt="Pacific Island Earthquakes"></p>

__California__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/california_dark.png" alt="California Earthquakes"></p>

__Alaska__
<p align="center"><img src="https://github.com/meielerol/leaflet-challenge/blob/main/images/alaska_normal.png" alt="Alaska Earthquakes"></p>