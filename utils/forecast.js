const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url ='https://api.darksky.net/forecast/e3282e3f4a0ff8e8c89d74994b0009a2/'+latitude +','+ longitude+'?units=si&lang=en'
//37.8267,-122.4233

    request({url:url, json: true },(error, response)=> {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }else if (response.body.error){
            callback('Unable to find location. Try another search', undefined)
    } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')

        }

    })
}

module.exports = forecast
