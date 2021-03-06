const request = require('request');

const getForcast = ({lat, long}, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.FORCAST_KEY}/${lat},${long}`;
  request({url, json: true}, (error, {body} = {}) => {
    if(error) {
      callback('Unable to connect to weather service', undefined);
    } else if(body.error) {
      callback(body.error, undefined);
    } else {
      const {currently, daily} = body;
      callback(undefined, `${daily.data[0].summary} It is currently ${currently.temperature} fahrenheit out. There is ${currently.precipProbability}% chance of rain.`);
    }
  });
}

module.exports = getForcast;