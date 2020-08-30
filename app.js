const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', 
{useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
const exphbs = require('express-handlebars')
const todo = require('./todo')

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
    todo.find()//從資料庫找出資料
        .lean()//轉圜單純JS物件
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
    return res.render('new')
})

app.post('/todos', (req, res) => {
    const name = req.body.name
    // const todos = new todo({ name })
    // return todos.save()
    //     .then(() => res.redirect('/'))
    //     .catch(error => console.error(error))
    return todo.create({ name })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    return todo.findById(id)
        .lean()
        .then( todoItem => res.render('detail', { todoItem }))
        .catch(error => console.log(error))
})




app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})


