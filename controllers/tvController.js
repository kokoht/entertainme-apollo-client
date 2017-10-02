const Tv = require('../models/tv')

const findAllTv = (req, res) => {
  Tv.find({}, (err, result) => {
    if(err) {
      res.send(err)
    } else {
      res.send({
        text: 'showed all tv',
        data: result
      })
    }
  })
}

const createTv = (req, res) => {
  var addTv = new Tv({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  newTv.save((err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

const findOne = (req, res) => {
  Tv.findById(req.params.id, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

const updateTv = (req, res) => {
  Tv.findById(req.params.id, (err, result) => {
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

const deleteTv = (req, res) => {
  Tv.findByIdAndRemove(req.params.id, (err, result) => {
    if(err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

module.exports = {
  deleteTv,
  updateTv,
  findOne,
  createTv,
  findAllTv
}
