const request = require('postman-request')

const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5reXkiLCJhIjoiY2xqaXpzNno1MDU3bzNkbWt3aGk0eno4diJ9.nP3wYcCBcw3Tno3jzchNQw&limit=1'

    request({url, json:true}, (error, {body})=>{

        if(error){
            callback('unable to connect to location services', undefined)
        }
        else if(body.features.length===0){
            callback('No such location exists', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })

}

module.exports = geocode