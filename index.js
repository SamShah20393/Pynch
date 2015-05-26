var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var YT = require('./sources/YouTubeAPI.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.statusCode = 302;
  response.setHeader("Location", YT.YouTubeAuth());
  response.end();
});

app.get('/oauth2callback', function(request, response) {
	response.send("I got this = " + request.query.code);
    YT.YouTubeToken(request.query.code)
});

app.get('/user', function(request, response) {
	response.send("Hi There!");
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
