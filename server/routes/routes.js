const Router = require('express').Router()
const UserController = require('../controllers/userController')
const ArticleController = require('../controllers/articleController')
const {authenticate, authorize} = require('../middlewares/auth')
const image = require('../helpers/image')

Router.get('/', (req, res) => {res.status(200).json({message: 'Home'})})

Router.post('/login', UserController.login)
Router.post('/register', image.multer.single('profilePic'), image.sendUploadToGCS, UserController.create)


Router.get('/articles', ArticleController.findAll)
Router.get('/articles/:id', ArticleController.findOne)
Router.use(authenticate)
Router.post('/articles', image.multer.single('img'), image.sendUploadToGCS, ArticleController.create)
Router.put('/articles/:id', ArticleController.put)
Router.patch('/articles/:id', ArticleController.patch)
Router.delete('/articles/:id', ArticleController.delete)


module.exports = Router