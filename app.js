
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('port', '3001');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.set('port', '3000'); 
});

// Routes

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/fw', function(req, res) {
    res.render('fw');
});


// Only listen on $ node app.js

if (!module.parent) {
  app.listen( app.set('port'));
  console.log("Express server listening on port %d", app.address().port);
}
