const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')

const usePassport = require('./config/passport')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Session setting
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUUninitialized: true
}))

usePassport(app)

app.use(flash())
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

// create server connect
require('./config/mongoose')

// front engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
