var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

var mongoose = require('mongoose')
var axios = require('axios')
var responseTime = require('response-time')
var redis = require('redis')

var clientRedis = redis.createClient()
clientRedis.on('error', err => {
  console.log(err);
})

const movieUrl = 'http://localhost:3001/movies'
const tvUrl = 'http://localhost:3002/tv'

const findMovie = () => axios.get(movieUrl)
const findTv = () => axios.get(tvUrl)

const entertainMe = async () => {
  try {
    const movies = await findMovie()
    const tv = await findTv()

    var data = {
      movies: movies.data,
      tv: tv.data
    }
    return data
  } catch (err) {
    console.log(err);
  }
}

app.use(responseTime())

app.get('/entertainme', (req, res) => {
  clientRedis.get('entertainme', (error, response) => {
    // param isine = key sama callback
    if(response) {
      res.send({
        response: JSON.parse(response),
        source: 'redis'
      })
    } else {
      entertainMe()
      .then(data => {
        clientRedis.setex('entertainme', 10, JSON.stringify(data))
        // param isine key, time, datane
        res.send({
          result: data,
          source: 'database'
        })
      })
    }
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(3000)
// module.exports = app;
