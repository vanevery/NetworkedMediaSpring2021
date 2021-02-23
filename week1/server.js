var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World! Here Is A Small Change');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});