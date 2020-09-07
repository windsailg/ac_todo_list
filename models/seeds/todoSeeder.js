const mongoose = require('mongoose')
const todo = require('../todo')

mongoose.connect('mongodb://localhost/todo-list',
  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error！')
})
db.once('open', () => {
  console.log('mongoDB connected')
  for (let i = 0; i < 10; i++) {
    todo.create({ name: `name-${i}` })
  }
  console.log('done.')
})
