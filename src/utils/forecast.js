const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + latitude + '&lon=' + longitude + '&appid=2ad080b2e81d4af40532e7c549cb2c66'

    request( { url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to reach the forecast service!', undefined)
        }else if(body.cod !== 200){
            callbacl('Location not found. Try again with different location please!', undefined)
        }else{
            callback(undefined,/*
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                cityName: body.name,*/
                'The weather in ' + body.name + ' is ' +  body.weather[0].description +  ' with temperature ' + body.main.temp
            )
        }
    })
}


module.exports = forecast