const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + latitude + '&lon=' + longitude + '&appid=dc7cfb6dc5dbb3a3feda9cf6a72a5e55'

    request( { url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to reach the forecast service!', undefined)
        }else if(body.cod !== 200){
            callbacl('Location not found. Try again with different location please!', undefined)
        }else{
            callback(undefined, 'The weather in ' + body.name + ' is ' +  body.weather[0].description +  ' with temperature ' + body.main.temp)
        }
    })
}


module.exports = forecast