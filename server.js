require('dotenv').config()

console.log(process.env)

var express = require('express')
  , routes = require('./routes')

var app = express();

// all environments

var portz = (process.env.PORT);
var dirz = (__dirname);
console.log(process.env.PORT);
console.log(__dirname);
app.locals.name = 'Luke';

console.log(app.get('env'))

app.set('views', './views');
app.set('view engine', 'jade');
app.set('view options', {layout: false });
app.set('port', process.env.PORT);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(dirz + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/no-overs', routes.index3);
app.get('/cat', routes.index2);
app.get('/maybe-ugly', routes.indexPaper);
app.get('/weird', routes.indexWeird);
app.get('/gray', routes.indexGray);
app.get('/old', routes.indexOld);
app.get('/', routes.index);
app.get('/m/art', routes.mobileArt);
app.get('/m/blog', routes.mobileBlog);
app.get('/m/other', routes.mobileOther);
app.get('/m/code', routes.mobileCode);
app.get('/m', routes.mobile);
app.get('/ie', routes.ie);

app.listen(process.env.PORT || 5000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
