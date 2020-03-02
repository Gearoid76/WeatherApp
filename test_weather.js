const request = require('request')


// const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-112'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')   
//     }
// })

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location services!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try another search.')
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }
// })
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoidGltb20iLCJhIjoiY2s1NGNkanFjMDRlNTNza2JjbTVibWcxaSJ9.SJUSK7Y6kwUGVe2GCo_H6w&limit=1'


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}



geocode('Dublin', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})