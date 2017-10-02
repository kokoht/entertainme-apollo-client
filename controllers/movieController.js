const Movie = require('../models/movie')

const findAllMovies = (req, res) => {
  Movie.find({}, (err, result) => {
    if(err) {
      res.send(err)
    } else {
      res.send({
        text: 'showed all movies',
        data: result
      })
    }
  })
}

const createMovie = (req, res) => {
  var addMovie = new Movie({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  addMovie.save((err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

const findOne = (req, res) => {
  Movie.findById(req.params.id, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

const updateMovie = (req, res) => {
  Movie.findById(req.params.id, (err, result) => {
    result.title = req.body.title || result.title
    result.overview = req.body.overview || result.overview
    result.poster_path = req.body.poster_path || result.poster_path
    result.popularity = req.body.popularity || result.popularity
    result.tag = req.body.tag || result.tag
    result.status = req.body.status || result.status
    result.save((err, editedResult) => {
      if (err) {
        res.send(err)
      } else {
        res.send(editedResult)
      }
    })
  })
}

const deleteMovie = (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, result) => {
    if(err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

module.exports = {
  deleteMovie,
  updateMovie,
  findOne,
  createMovie,
  findAllMovies
}
