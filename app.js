const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");    
});

app.post("/", function(req, res){
    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=685820427c29ba407059f11d210b5223&units=metric"

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const disc = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Curently the weather is " + disc + " in " + query + ".</h1>")
            res.write("<h1>The weather in " + query + " is " + temp + " degrees celcius</h1>")
            res.write("<img src=" + imageUrl +">");
        });
    });
});

app.listen(3000, function(){
    console.log("The server is running...")
});