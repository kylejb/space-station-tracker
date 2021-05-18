const express = require('express');
const { json } = require('body-parser');
const request = require('request');
const path = require('path');

const port = process.env.PORT || 5000 // Heroku needs PORT var

const app = express();

const buildPath = path.join(__dirname, '..', 'build'); // consider renaming
app.use(express.static(buildPath));

app.use(json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//! for development - REMOVE block before deployment
if (process.env.NODE_ENV !== "production") {
    app.options("*", function(req, res) {
        res.sendStatus(200);
    });
}

app.post('/api/v1/spotthestation', (req, res) => {
    const baseURL = "https://spotthestation.nasa.gov/sightings/xml_files";
    const spotTheStationObj = {
        country: req.body.country,
        state: req.body.state,
        city: req.body.city
    };
    request(
        { url: `${baseURL}/${spotTheStationObj.country}_${spotTheStationObj.state}_${spotTheStationObj.city}.xml` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error });
            }
            res.send(body);
        }
    );
});

app.listen(port, () => {
	console.log('Now listening on port:', port);
});
