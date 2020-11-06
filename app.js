const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')

const usePassport = require('./config/passport')
usePassport(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// create server connect
require('./config/mongoose')

// Session setting
app.use(session({
  secret: 'MySecretIsVerySecret',
  resave: false,
  saveUUninitialized: true
}))

// front engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
