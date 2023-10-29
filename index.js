const env = require("dotenv").config()
const express = require("express");
const body_parser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({ extended: true }));

app.get("/display", function (req, res) {
    res.redirect("/");
})
app.post("/display", function (req, res) {
    const cityname = req.body.mycity;

    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=c897d8e653ff6b5dae58cc700dafdb4b" + "&units=metric";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weather_data = JSON.parse(data);
            if (weather_data.cod == 200) {
                res.render("home", weather_data);
            }
            else {
                res.render("temp");
            }
        })
    })

})
app.get("/", function (req, res) {
    res.render("landing");
})

app.listen(3000, function () {
    console.log("Port running on 3000");
})