const { verify } = require('../helpers/jwt')
const User = require('../models/user')
const Article = require('../models/article')

module.exports = {
  authenticate: function(req, res, next) {
    console.log(req.headers.token, '===============')
    let token = req.headers.token;
    if (!token) {
      res.status(401).json({ error: 'You must login to access this endpoint' });
    } else {
      let decoded = verify(token);
      console.log(decoded)
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           req.user = user;
           next();
         } else {
           res.status(401).json({ error: 'User is not valid' });
         }
       })
       .catch(err => { res.status(500).json(err) })
    }
  },
  authorize: function(req, res, next) {
    console.log(req.user,'==========')
    let articleId = (req.params.id) ? req.params.id : req.body.id
    Article.findOne({ _id: articleId })
      .then(article => {
        if(article.author == req.user.name) {
          next()
        } else {
          res.status(401).json({ error: 'Unauthorized' })
        }
      })
      .catch(err => { res.status(500).json(err) })
  },
}
