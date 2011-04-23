var express = require('express');

var pub = __dirname + '/root/static';

var app = express.createServer();

//app.use(express.compiler({ src: pub }));
app.use(app.router);
app.use(express.static(pub));
app.use(express.errorHandler({ dump: true, stack: true}));

app.set('views', __dirname + '/root/src/');
app.set('view engine', 'jade');
//console.log('setting views dir to: ' + __dirname + '/root/src/');

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(3000);
console.log('App started on http://localhost:3000');
