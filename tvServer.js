var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var tv = require('./controllers/tvController')

mongoose.connect('mongodb://localhost/cachedb', function(err){
  if(err) {console.log(err);}
  else {
    console.log('db connected');
  }
})

//ok
app.get('/tv', (req, res) => {
  res.send('tv server is working')
})

app.get('/tv', tv.findAllTv)
app.post('/tv', tv.createTv)
app.get('./tv/:id', tv.findOne)
app.put('/tv/:id', tv.updateTv)
app.delete('/tv/:id', tv.deleteTv)

app.listen(3002)
