// get the dataset
const urlLastHour = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
const urlLastDay = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const urlLast7Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const urlLast30Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// sample the data
d3.json(urlLast7Days, function(data) {
    console.log(data.features);

    // call the function
    createFeatures(data.features);
});

function assignMagColor(earthqukeMagnitude) {
    if (earthqukeMagnitude <= 1) {
        color = "#00cc00";
    } else if (earthqukeMagnitude <= 2) {
        color = "#66ff33";
    } else if (earthqukeMagnitude <= 3) {
        color = "#ccff33";
    } else if (earthqukeMagnitude <= 4) {
        color = "#ffff00";
    } else if (earthqukeMagnitude <= 5) {
        color = "#ff9933";
    } else if (earthqukeMagnitude <= 6) {
        color = "#ff9999";
    } else if (earthqukeMagnitude <= 7) {
        color = "#cc5200";
    } else if (earthqukeMagnitude <= 8) {
        color = "#e62e00";
    } else {
        color = "#b30000";
    };
    // console.log(earthqukeMagnitude, color);

    return color;
};

function createFeatures(earthquakeData) {
    let earthquakeMarkers = [];
    for (i=0; i < earthquakeData.length; i++) {
        // get magnitude (richter)
        let mag = earthquakeData[i].properties.mag;
        // console.log("magnitude", mag);

        // get magnitude color
        let magColor = assignMagColor(mag);
        // console.log("magnitude color", magColor);

        // get depth (km)
        let depth = earthquakeData[i].geometry.coordinates[2];
        // console.log("depth", depth);

        // get latitude
        let lat = earthquakeData[i].geometry.coordinates[1];
        // console.log("latitude", lat);

        // get longitude
        let lng = earthquakeData[i].geometry.coordinates[0];
        // console.log("longitude", lng);

        // get place info
        let place = earthquakeData[i].properties.place;
        // console.log("place", place);

        // create a marker and bind a popup with the information
        let earthquake = L.circle(
            [lat, lng], {
            color: magColor,
            fillColor: magColor,
            fillOpacity: 0.5,
            radius: mag * 10000
        }).bindPopup("<h3>Place: " + place + 
            "<hr>Location: [" + lat + ", " + lng + 
            "] <br>Mag: " + mag + 
            " (Richter)<br>Depth: " + depth + 
            " (km)</h3>");
        // console.log(earthquake);

        // add markers
        earthquakeMarkers.push(earthquake);
    };
    // console.log(earthquakeMarkers);

    // create the layer group for the earthquake markers
    createMap(earthquakeMarkers);
};

function createMap(earthquakeMarkers) {
    // console.log(earthquakeMarkers);

    // Define streetmap and darkmap layers
    let normal = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
    let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });
    let dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        Normal: normal,
        Light: light,
        Dark: dark,
    };

    // // add markers to earquake layer group
    let earthquakeLayer = L.layerGroup(earthquakeMarkers);

    // // Create overlay map to hold earthquakes layer
    let overlayEarthquakes = {
        Earthquakes: earthquakeLayer
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [39.8283, -98.5795],
        zoom: 4,
        layers: [normal, earthquakeLayer]    //add the earthquakeLayer
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayEarthquakes).addTo(myMap);    //add the overlayEarthquakes layer
};