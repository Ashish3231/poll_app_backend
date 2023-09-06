module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('polls', {
    id: {
      type: Sequelize.BIGINT, // ID (Primary Key)
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    discription: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.BIGINT
    }
  })

  return User
}
