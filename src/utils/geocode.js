const request = require('postman-request');

const geoCode = (address, callback) => {
    const geoAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGhzaW1zIiwiYSI6ImNrZTl1dDM0czJhOXgyem9iaDBna3k1MXkifQ.vu_2x5nFZv3uJLPzKZpc8A`;
  
    request({ url: geoAPI, json: true }, (error, res) => {
      if (error) {
        callback("unable to connect to geo api", undefined);
      } else if (res.body.features.length === 0) {
        callback("undefined location", undefined);
      } else {
        callback(undefined, {
          long: res.body.features[0].center[0],
          lat: res.body.features[0].center[1],
          location:res.body.features[0].place_name
        });
      }
    });
  };
  
   module.exports = geoCode;