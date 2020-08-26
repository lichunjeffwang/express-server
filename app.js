var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var codetableRouter = require('./routes/codetable');
var containerflowRouter = require('./routes/containerflow');
var purchaseorderitemRouter = require('./routes/purchaseorderitem');
var userinfoRouter = require('./routes/userinfo');
var usersRouter = require('./routes/users');
var barcodeRouter = require('./routes/barcode');
var loginRouter = require('./routes/login');
var queryRouter = require('./routes/query');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/containerflow', containerflowRouter);
app.use('/codetable', codetableRouter);
app.use('/purchaseorderitem', purchaseorderitemRouter);
app.use('/userInfo', userinfoRouter);
app.use('/users', usersRouter);
app.use('/barcode', barcodeRouter);
app.use('/login', loginRouter);
app.use('/query', queryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;