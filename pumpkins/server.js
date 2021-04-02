var express = require('express');
var app = express();
app.use(express.static('public'));

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});
var chatdb = new Datastore({filename: "chat.db", autoload: true});


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

//var submittedData = [];

app.get('/chatjson', function(req, res) {
    chatdb.find({}, function(err, submittedData) {
        res.send(submittedData);
    });
})

//  /chatsubmit?message=The message
app.get('/chatsubmit', function(req, res) {
    var dataToStore = {
        message: req.query.message
   };

   chatdb.insert(dataToStore, function(err, newdoc) {
       console.log(err);
       res.send({message: "thanks"});
   });
});

app.get('/', function (req, res) {
  //res.send('Hello World!')

    db.find({}, function(err, submittedData) {
        var output = "<html><body>";
        for (var i = 0; i < submittedData.length; i++) {
            if (submittedData[i].file.mimetype == "application/pdf") {
                output = output + "<div>" +submittedData[i].title + "<a href='/uploads/" + submittedData[i].file.filename + "'>download</a></div>";
            } else if (submittedData[i].file.mimetype == "video/mp4") {
                output = output + "<div>" +submittedData[i].title + "<video width=\"300\" src='/uploads/" + submittedData[i].file.filename + "'></div>";
            } else {
                output = output + "<div>" +submittedData[i].title + "<img width=\"300\" src='/uploads/" + submittedData[i].file.filename + "'></div>";
            }
        }
        output = output + "</body></html>";
        res.send(output);
    });
});

app.get('/json', function(req, res) {
    db.find({}, function(err, submittedData) {
        res.send(submittedData);
    });
})

app.get('/search', function(req, res) {
    //
});

app.post('/fileupload', upload.single('thefile'), function (req, res) {
    
    console.log(req.file);

    var dataToStore = {
         file: req.file,
        title: req.body.title
    };


    db.insert(dataToStore, function(err, newdoc) {
        console.log(err);

    });

    res.redirect("/");
    // console.log(dataToStore);

    //res.send(req.file);
});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});