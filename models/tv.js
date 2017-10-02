const mongoose = require('mongoose')

const tvSchema = mongoose.Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tag: Array,
  status: String
})

const Tv = mongoose.model('Tv', tvSchema)

module.exports = Tv
