const request = require('request')
const asyncLoop = require('node-async-loop')

/**
 * 
 * First Get list of all videos for the given channel
 * @param channel_id -- YouTube Channel ID (not user id)
 * @param videos -- This has be a blank array
 * @param pageToken -- Used for recursive crawling 
 * 
 * 
 */

function getChannelVideos(channel_id, videos, pageToken, apiKey, callback) {
    return new Promise(function(resolve, reject) {
        const options = {
            method: 'GET',
            url: `https://www.googleapis.com/youtube/v3/search`,
            qs: {
                part: 'snippet',
                channelId: channel_id,
                maxResults: 50,
                key: apiKey,
                pageToken: pageToken
            }
        }

        request(options, function(err, resp, body) {
            if (err) reject(err)
            body = JSON.parse(body)
            if(body.nextPageToken) {
                var video_ids = []

                /**
                 * Creating an array of vedio_ids from the result
                 * This array will be used to get more details of the video
                 * 
                 */

                asyncLoop(body.items, function(item, next) {
                    video_ids.push(item.id.videoId)
                    next()
                }, function(err) {
                    if (err) reject(err)
                    
                    getVideoDetails(video_ids, apiKey)
                        .then(function(videoList) {

                            asyncLoop(videoList.items, function(video, next) {
                                videos.push(video)
                                next()
                            }, function(err) {
                                getChannelVideos(channel_id, videos, body.nextPageToken, apiKey, callback)
                            })
                        })
                        .catch(function(err) {
                            reject(err)
                        })
                })
            } else {
                callback(videos)
            }

        })

    })
}

/**
 * 
 * Function the fetch complete video details
 * @param video_ids -- entier a list of video_ids (max 50 and comma separeated) or a single id
 * 
 */

function getVideoDetails(video_ids, apiKey) {
    return new Promise(function(resolve, reject) {
        const options = {
            method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/videos',
            qs: {
                part: 'snippet,contentDetails,statistics',
                id: video_ids.join(),
                key: apiKey
            }
        }
        
        request(options, function(err, resp, body) {
            if (err) reject(err)
            resolve(JSON.parse(body))
        })
    })
}

exports.get = function(apiKey, channel_id) {
    return new Promise(function(resolve, reject) {
        if (!apiKey || apiKey === '') {
            reject('API Key is missing')
        }

        if (!channel_id || channel_id === '') {
            reject('Channel ID is required')
        }

        getChannelVideos(channel_id, [], null, apiKey, function(videos) {
            resolve(videos)
        })
    })
}