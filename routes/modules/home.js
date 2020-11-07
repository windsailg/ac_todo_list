const express = require('express')
const router = express.Router()

const todo = require('../../models/todo')
router.use(express.static('public'))

router.get('/', (req, res) => {
  const userId = req.user._id
  todo.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router
