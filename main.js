
global.__basedir = __dirname;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
require('nw');
//require('nw.gui').Window.get().showDevTools();

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/src');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// view engine setup
//app.set('views', path.join(__dirname, '/src'));
//app.set(' engine', 'html');
//app.engine('html', require('ejs').renderFile);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/',function(req, res){
    res.render('index.html');
} )

app.listen(app.get('port'),function(){

});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler


//module.exports = app;


