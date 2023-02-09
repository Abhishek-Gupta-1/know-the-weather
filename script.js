const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

    let City = req.body.Cname;
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+City+"&appid=f0e16fba2f05a102350a07cf492de196&units=metric";
    

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon; 
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            //Formating/beautify input City name

            let after = City.slice(1);
            new1 = City[0].toUpperCase() + after.toLowerCase();

            //Outputting all the data
            res.write("<h1>The temperature in " + new1 + " is : "+ temp + " degree Celcius</h1>");
            res.write("<h2>And the Weather is " + description + "</h2>" );
            res.write("<img src ='" + iconURL + "' >");
            res.write("<br> <br>")
            res.write("<a href = 'http://localhost:3000/'><button> Restart </button></a>");
            // res.send();
           
        });


    });
}); 


app.listen(3000, function(){
    console.log("The server is running at port 3000");
});