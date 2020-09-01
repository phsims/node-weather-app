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
      const highLow = `Todays there will be a high temprature of ${res.body.forecast[0].mintemp} of and a low of ${res.body.forecast[0].maxtemp}`;

      callback(undefined, { decription, current, highLow });
    }
  });
};

module.exports = getForcast;
