const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWhtYWQtYmFkZXIiLCJhIjoiY2tnMWZudHJnMGdzaDJzcXc3cjF4aXIyZyJ9.YCz7MX6hDFC_BNHtUNhVaQ'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable connect to location service ', undefined)
        }else if(body.message){
            callback('Location not found. Try again please with different location', undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode