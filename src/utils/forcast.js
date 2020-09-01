const request = require("postman-request");

const getForcast = (lat, long, callback) => {
  const weatherAPI = `http://api.weatherstack.com/current?access_key=f212e20c16cb54e481d517afaafda1d6&query=${lat},${long}&units=f`;

  request({ url: weatherAPI, json: true }, (error, res) => {
    console.log("this", res.body.current.weather_descriptions);
    if (error) {
      callback("unable to connect to weather api", undefined);
    } else if (!res.body) {
      callback("cant find location", undefined);
    } else {
      const decription = `${res.body.current.weather_descriptions[0]}.`;
      const current = `It is currrently ${res.body.current.temperature} degrees and feels like ${res.body.current.feelslike} degrees.`;
      const humidity = `The humidity is currently  ${res.body.current.humidity}.`;

      callback(undefined, { decription, current, humidity });
    }
  });
};

module.exports = getForcast;
