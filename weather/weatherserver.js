var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/weather', function(req, res) {
    // fetch("http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city.value + "&appid=35c64979bd7cb9c4a4c1075a39a320dc").then(function(response) {
    //     return response.json();
    // }).then(function(data) {
    //     console.log(data);
    //     document.getElementById("temp").innerHTML = "The temperature in " + data.name + " is " + data.main.temp// + data.
    // });

    var requestOptions = {
        host: 'api.openweathermap.org',
        path: "/data/2.5/weather?units=imperial&q=" + req.query.city + "&appid=35c64979bd7cb9c4a4c1075a39a320dc"
    };

    http.request(requestOptions, function(response) {
        // This string will contain everything back from the server but it will come in chunks
        var str = '';

        // Got a chunk
        response.on('data', function (chunk) {
                str += chunk;
        });

        response.on('end', function () {
                console.log(str);
                res.send(str);
        });
    }).end();

});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});