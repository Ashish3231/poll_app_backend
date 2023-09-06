const { authJwt } = require('../middleware')
const optionsController = require('../controllers/poll_option.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
    next()
  })
}
