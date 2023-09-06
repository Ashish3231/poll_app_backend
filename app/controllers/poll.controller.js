const db = require('../models')
const User = db.user
const Poll = db.polls
const PollOption = db.polls_option
const Sequelize = require('sequelize')

// To create a Poll and option
exports.createPoll = async (req, res) => {
  try {
    const { title } = req.body
    // console.log('user________id: ', req.userId)
    const pollData = {
      title: req.body.title,
      discription: req.body.discription,
      user_id: req.userId,
      polls: req.body.optionArr
    }

    if (!title) {
      return res.status(400).json({
        message: 'title is required for creating question'
      })
    }

    const poll = await Poll.create(pollData, {
      include: [
        {
          model: PollOption,
          as: 'polls'
        }
      ]
    })

    res.status(200).json({
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

// To view a Poll and it's options
exports.viewPoll = async (req, res) => {
  try {
    const pollId = req.params.id
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
        id: pollId
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

// To view all Poll and it's options
exports.findAllPoll = async (req, res) => {
  try {
    const poll = await Poll.findAll({
      include: [
        {
          model: PollOption,
          as: 'polls',
          separate: true, // ------------------------------------------------need to study
          required: false
        }
      ]
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

// To increase the count of votes
exports.addVote = async (req, res) => {
  try {
    const pollId = req.body.poll_id
    const optionId = req.body.option_id

    const increase = 1
    const updatedOn = new Date()
    const pollOption = await PollOption.update(
      {
        votes: Sequelize.literal(`votes + ${increase}`),
        updatedAt: updatedOn
      },
      {
        where: {
          poll_id: pollId,
          id: optionId
        }
      }
    )

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
        id: pollId
      }
    })

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
