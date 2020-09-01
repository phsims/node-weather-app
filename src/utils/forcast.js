const request = require("postman-request");


const getForcast = (lat, long, callback) => {
  const weatherAPI = `http://api.weatherstack.com/current?access_key=f212e20c16cb54e481d517afaafda1d6&query=${lat},${long}&units=f`;

  request({ url: weatherAPI, json: true }, (error, res) => {
    if (error) {
      callback("unable to connect to weather api", undefined);
    } else if (!res.body) {
      callback("cant find location", undefined);
    } else {
      const message = `${res.body.current.weather_descriptions[0]}. it is currrently ${res.body.current.temperature} degrees but feels like ${res.body.current.feelslike} degrees`;

      callback(undefined, message);
    }
  });
};

module.exports = getForcast;
