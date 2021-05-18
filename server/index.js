const express = require('express');
const request = require('request');
const path = require('path');

const port = process.env.PORT || 5000 // Heroku needs PORT var

const app = express();
const buildPath = path.join(__dirname, '..', 'build'); // consider renaming
app.use(express.static(buildPath));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/v1/spotthestation', (req, res) => {

    request(
        { url: "https://freegeoip.app/json" },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

app.listen(port, () => {
	console.log('Now listening on port:', port);
});
