const videos = require('./script')

videos.get(process.env.API_KEY, 'UCGBnz-FR3qaowYsyIEh2-zw')
    .then(function(result) {
        console.log(result)
    })
    .catch(function(err) {
        console.log(err)
    })