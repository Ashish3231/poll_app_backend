const { authJwt } = require('../middleware')
const controller = require('../controllers/poll.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
    next()
  })

  app.post('/api/poll/create', [authJwt.verifyToken], controller.createPoll)

  app.get('/api/poll/:id', [authJwt.verifyToken], controller.viewPoll)

  app.get('/api/poll', [authJwt.verifyToken], controller.findAllPoll)

  app.patch('/api/poll/vote', [authJwt.verifyToken], controller.addVote)
}
