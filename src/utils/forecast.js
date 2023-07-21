const request = require('postman-request');

const forecast = (latitude, longitude, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=b14dd4b091211b55a05d96908f8f4fc1&query=' + latitude + ',' + longitude +'&units=f';

    request({url, json:true}, (error, {body} )=>{
        if(error){
            callback('unable to connect to location services', undefined)
        }
        else if(body.error){
            callback('No such loaction exists', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees out. There is a '+ body.current.precip+'% chance of rain.')
        }
    })

}

module.exports = forecast


