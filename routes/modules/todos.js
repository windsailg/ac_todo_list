const express = require('express')
const router = express.Router()

const todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return todo.findOne({ _id, userId })
    .lean()
    .then(todoItem => res.render('detail', { todoItem }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return todo.findOne({ _id, userId })
    .lean()
    .then(todoItem => res.render('edit', { todoItem }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  return todo.findOne({ _id, userId })
    .then(todoItem => {
      todoItem.name = name
      todoItem.isDone = isDone === 'on'
      return todoItem.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return todo.findOne({ _id, userId })
    .then(todoItem => todoItem.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
