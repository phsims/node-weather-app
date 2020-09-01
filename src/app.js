const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const getForcast = require("./utils/forcast");

const app = express();
const port = process.env.PORT||3000;

//define paths
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "pam",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "pammy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "pammy 1",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geoCode(address, (error, {long,lat, location}={}) => {
    if (error)return res.send({error});

    getForcast(lat,long, (error, forcast) => {
      if (error)return res.send({error});

        res.send({
          forcast,
          location,
          address: address,
        });
    });
  });

});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "its broken!",
  });
});

app.listen(port, () => {
  console.log(`Listening on port 3000 ${port}`);
});
