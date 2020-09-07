const express = require('express')
const app = express()
const port = 3001

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list',
  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
const exphbs = require('express-handlebars')
const todo = require('./models/todo')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

db.on('error', () => {
  console.log('mongoDB error！')
})
db.once('open', () => {
  console.log('mongoDB connected')
})

app.get('/', (req, res) => {
  todo.find()// 從資料庫找出資料
    .lean()// 轉圜單純JS物件
    .sort({ _id: 'asc' })// desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return todo.findById(id)
    .lean()
    .then(todoItem => res.render('detail', { todoItem }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return todo.findById(id)
    .lean()
    .then(todoItem => res.render('edit', { todoItem }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone} = req.body
  return todo.findById(id)
    .then(todoItem => {
      todoItem.name = name
      todoItem.isDone = isDone === 'on'
      return todoItem.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return todo.findById(id)
    .then(todoItem => todoItem.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
