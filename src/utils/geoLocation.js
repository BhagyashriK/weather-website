const request = require('request');

// Get Lat Long for pune 
const getGeoLocation = (searchTerm, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=pk.eyJ1IjoiYmhhZ3lhc2hyaWprIiwiYSI6ImNqeXZoczNwMTBsOHozbm55YWNtMW01N3kifQ.sOE1W42JdWM47-Ii3K8MZQ`;
  request({url, json: true}, (error, {body} = {}) => {
    if(error) {
      callback('Unable to connect to geo location service', undefined);
    } else if(!body.features.length) {
      callback('Unable to find location. Try another search!', undefined);
    } else {
      callback(undefined, {
        long: body.features[0].center[0],
        lat: body.features[0].center[1],
        location: body.features[0].place_name
      })
      // getWeather({lat:, long: })
    }
  });
}

module.exports = getGeoLocation;