var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var movie = require('./controllers/movieController')

mongoose.connect('mongodb://localhost/cachedb', function(err){
  if(err) {console.log(err);}
  else {
    console.log('db connected');
  }
})

// ok
app.get('/movie', (req, res) => {
  res.send('movie server is working')
})

app.get('/movies', movie.findAllMovies)
app.post('/movies', movie.createMovie)
app.get('./movies/:id', movie.findOne)
app.put('/movies/:id', movie.updateMovie)
app.delete('/movies/:id', movie.deleteMovie)

app.listen(3001)
