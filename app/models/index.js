const config = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user/user.model.js')(sequelize, Sequelize)
db.polls = require('./poll/polls.model.js')(sequelize, Sequelize)
db.polls_option = require('./poll/polls_option.model.js')(sequelize, Sequelize)
// db.user_poll_vote = require('./user/user_poll_vote.model.js')(sequelize, Sequelize)
//mapping

// user and poll mapping
db.user.hasMany(db.polls, { as: 'user', foreignKey: 'user_id' })
db.polls.belongsTo(db.user, { as: 'user', foreignKey: 'user_id' })

// db.user.belongsToMany(db.user, { as: 'userPoll', foreignKey: 'user_id', through: db.polls })

//poll and otption mapping
db.polls.hasMany(db.polls_option, { as: 'polls', foreignKey: 'poll_id' })
db.polls_option.belongsTo(db.polls, { as: 'polls', foreignKey: 'poll_id' })

//user and vote mapping
// db.user_poll_vote.hasMany(db.user, { as: 'vote', foreignKey: 'user_id' })
// db.user.belongsTo(db.user_poll_vote, { as: 'vote', foreignKey: 'user_id' })

// db.user_poll_vote.hasMany(db.polls, { as: 'pollvotes', foreignKey: 'poll_id' })
// db.polls.belongsTo(db.user_poll_vote, { as: 'pollvotes', foreignKey: 'poll_id' })

module.exports = db
