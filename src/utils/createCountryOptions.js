const fs = require('fs');
let geoMap = require('/Users/kylejb/Work/Code/Projects/space-station-tracker/src/data/geoMap.json');

const countryOptions = [];
for (const country in geoMap) {
    countryOptions.push({value: country, label: country.replace("_", " ")});
}

fs.writeFile('/Users/kylejb/Work/Code/Projects/space-station-tracker/src/data/countryOptions.json', JSON.stringify(countryOptions), 'utf-8', function (err) {
    if (err) return console.log(err);
    console.log('Saved countryOptions object to current dir!');
});
