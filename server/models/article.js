const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  img: String,
  content: String,
  author : String,
  postedAt: Date,
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article