## Get detailed list of all videos from a YouTube Channel

    npm install node-yt --save

## Usage

Import the module on your node project and follow the below method to get list of all videos under a YouTube Channel.

    const yt = require('node-yt')
    
    yt.get('API_KEY', 'Channel_ID') // Only Channel ID, User ID not supported
	    .then((videos) => {
		    console.log(videos)
		})
		.catch((err) => {
			console.log(err)
		})

## Test

    API_KEY={ Your API KEY } npm test

[Click here](https://console.developers.google.com/) to get API_Key from Google Developers Console

Report bugs on GitHub - https://github.com/iSanjayAchar/node-yt/issues

This module is a re-write of [youtube-channel-videos](https://www.npmjs.com/package/youtube-channel-videos). This module gives you detailed info about the videos