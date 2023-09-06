const db = require('../models')
const User = db.user
const Poll = db.polls
const PollOption = db.polls_option

//get user poll
exports.userPoll = async (req, res) => {
  try {
    const userId = req.params.id
    const poll = await Poll.findAll({
      include: [
        {
          model: PollOption,
          as: 'polls',
          separate: true, // ------------------------------------------------need to study
          required: false
        }
      ],
      where: {
        user_id: userId
      }
    })

    if (!poll) {
      return res.status(400).json({
        message: 'question not found'
      })
    }

    return res.status(200).json({
      success: true,
      poll
    })
  } catch (err) {
    console.log('*******', err)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}
