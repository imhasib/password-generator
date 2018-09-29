var express = require('express');
var app = express();
var path = require('path');
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname , '/views')));
//Store all HTML files in view folder.
// app.use(express.static("scripts"));
//Store all JS and CSS in Scripts folder.

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
app.get('/index2', function (req, res) {
  res.sendFile(__dirname + '/views/index_2.html');
});
app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});