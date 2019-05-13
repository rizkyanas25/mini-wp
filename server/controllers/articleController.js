const Article = require('../models/article')
const { ObjectId } = require('mongoose').Types


class ArticleController {
  static create(req, res) {
    let {title, content, author} = req.body
    let newArticle = {
      title,
      img : req.file.cloudStoragePublicUrl,
      content,
      author,
      postedAt: new Date()
    }
    Article.create(newArticle)
      .then(data => {
        res.status(201).json({ data })
      })
      .catch(err => {
        res.status(500).json({ message: err.message})
      })
  }

  static findAll(req, res) {
    Article
      .find({},{}, {
        sort: {
          _id : -1
        }
      })
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({message : err.message})
      })
  }

  static findOne(req, res) {
    Article
      .findById(ObjectId(req.params.id))
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static put(req, res) {
    let {title, img, content} = req.body
    Article
      .findByIdAndUpdate(ObjectId(req.params.id),
      {
        title,
        img,
        content
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }

  static patch(req, res) {
    Article
      .findByIdAndUpdate(ObjectId(req.params.id), {
        [req.body.field] : req.body.value
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static delete(req, res) {
    Article
      .deleteOne({_id : ObjectId(req.params.id)})
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }
}

module.exports = ArticleController