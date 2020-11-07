const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')

const usePassport = require('./config/passport')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Session setting
app.use(session({
  secret: 'MySecretIsVerySecret',
  resave: false,
  saveUUninitialized: true
}))

usePassport(app)
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
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
