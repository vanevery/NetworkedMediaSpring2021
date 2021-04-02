var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser); 

app.use(express.static('public'));

app.set('view engine', 'ejs');

var lastimage = "";

var quotes = [];

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/save', function(req, res) {
    var imagedata = req.body.image;

    lastimage = imagedata;

    var dataWrapper = {imagedata: lastimage};
    res.render("image.ejs", dataWrapper);
});

app.get('/quote', function(req, res) {
    quotes.push(req.query.quote);
    var dataWrapper = {quotes: quotes};
    res.render("index.ejs", dataWrapper);
})

app.get('/render', function(req, res) {
    var dataWrapper = {imagedata: lastimage};
    res.render("image.ejs", dataWrapper);
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})

