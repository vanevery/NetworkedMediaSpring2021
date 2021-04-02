var express = require('express');
var app = express();
app.use(express.static('public'));

var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

//var submittedData = [];

app.get('/', function (req, res) {
  //res.send('Hello World!')

    db.find({}, function(err, submittedData) {
        var output = "<html><body>";
        for (var i = 0; i < submittedData.length; i++) {
            output = output + "<div style='color: " + submittedData[i].color + "'>" +submittedData[i].text + "</div>";
        }
        output = output + "</body></html>";
        res.send(output);
    });

    
});

app.get('/search', function(req, res) {
    //
});

app.post('/formpost', function (req, res) {
    // req.body.color
    // req.body.text

    // var dataToStore = new Object();
    // dataToStore.color = req.body.color;
    // dataToStore.text = req.body.text;

    var dataToStore = {
        color: req.body.color,
        text: req.body.text
    };

    //submittedData.push(dataToStore);

    db.insert(dataToStore, function(err, newdoc) {
        console.log(err);

    });

    console.log(dataToStore);

    res.send("Got all your data: " + req.body.text);
});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});