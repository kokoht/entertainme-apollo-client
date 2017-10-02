const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: Number,
  tag: Array,
  status: String
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
