const videos = require('./script')
const fs = require('fs')

videos.get(process.env.API_KEY, 'UCGBnz-FR3qaowYsyIEh2-zw')
    .then(function(result) {
        fs.writeFile("./videos.json", JSON.stringify(result), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    })
    .catch(function(err) {
        console.log(err)
    })