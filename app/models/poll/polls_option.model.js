module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('polls_option', {
    id: {
      type: Sequelize.BIGINT, // ID (Primary Key)
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.STRING(255),
      required: true
    },
    votes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    poll_id: {
      type: Sequelize.BIGINT
    }
  })

  return User
}
