// This is a server
// Another change


var express = require('express');
var app = express();
app.use(express.static('public'));

var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

app.get('/drawingjson', function(req, res) {
    db.find({}, function(err, submittedData) {
        res.send(submittedData);
    });
})

//  /chatsubmit?message=The message
app.get('/drawingsubmit', function(req, res) {
    var dataToStore = {
        x: req.query.x,
        y: req.query.y
   };

   db.insert(dataToStore, function(err, newdoc) {
       console.log(err);
       //res.send({message: "thanks"});
       db.find({}, function(err, submittedData) {
        res.send(submittedData);
    });
   });
});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});