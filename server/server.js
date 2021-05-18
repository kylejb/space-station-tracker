const express = require('express');
const path = require('path');

const app = express()
const port = process.env.PORT || 5000 // Heroku needs PORT var

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.listen(port, () => console.log(`App is live on port ${port}!`));
