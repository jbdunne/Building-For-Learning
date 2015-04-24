var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var queryString = require( "querystring" );
var url = require( "url" );

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.get('/render', function(req, res){

  // parses the request url
  var theUrl = url.parse( req.url );

  // gets the query part of the URL and parses it creating an object
  var queryObj = queryString.parse( theUrl.query );

  // queryObj will contain the data of the query as an object
  // and jsonData will be a property of it
  // so, using JSON.parse will parse the jsonData to create an object
  var obj = JSON.parse( queryObj.code );

  var html = '<html ng-app="app"> \
  <head><script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js"></script><script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script></head> \
  <body> \
  ';

  html += unescape(obj.code);

  html += '<script charset="utf-8"> \
  angular.module("app", []); \
  </script> \
  </body> \
  </html>';

  res.send(html);

});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/node', function(req, res){
  res.sendFile(__dirname + '/nodePage.html');
});

app.get('/ang', function(req, res){
  res.sendFile(__dirname + '/angPage.html');
});

app.get('/html', function(req, res){
  res.sendFile(__dirname + '/htmlPage.html');
});

app.get('/css', function(req, res){
  res.sendFile(__dirname + '/cssPage.html');
});

app.get('/images/angular.png', function(req, res){
  res.sendFile(__dirname + '/images/angular.png');
});

app.get('/images/html.png', function(req, res){
  res.sendFile(__dirname + '/images/html.png');
});

app.get('/images/css.png', function(req, res){
  res.sendFile(__dirname + '/images/css.png');
});

app.get('/images/node.png', function(req, res){
  res.sendFile(__dirname + '/images/node.png');
});

app.get('/images/back.png', function(req, res){
  res.sendFile(__dirname + '/images/back.png');
});

app.get('/images/back.svg', function(req, res){
  res.sendFile(__dirname + '/images/back.svg');
});

app.get('/images/codeAble.png', function(req, res){
  res.sendFile(__dirname + '/images/codeAble.png');
});

app.get('/images/css.png', function(req, res){
  res.sendFile(__dirname + '/images/css.png');
});

app.get('/images/description.png', function(req, res){
  res.sendFile(__dirname + '/images/description.png');
});

app.get('/images/hamburger.png', function(req, res){
  res.sendFile(__dirname + '/images/hamburger.png');
});

app.get('/images/logo.png', function(req, res){
  res.sendFile(__dirname + '/images/logo.png');
});

app.get('/images/preview.png', function(req, res){
  res.sendFile(__dirname + '/images/preview.png');
});

app.get('/images/thumbdown.png', function(req, res){
  res.sendFile(__dirname + '/images/thumbdown.png');
});

app.get('/images/thumbup.png', function(req, res){
  res.sendFile(__dirname + '/images/thumbup.png');
});

app.get('/stylesheets/screen.css', function(req, res){
  res.sendFile(__dirname + '/stylesheets/screen.css');
});

app.get('/stylesheets/grid/output.css', function(req, res){
  res.sendFile(__dirname + '/stylesheets/grid/output.css');
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});



http.listen(4000, function(){
  console.log('listening on *:4000');
});
