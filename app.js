const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3001

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// 建立伺服器連線
require('./config/mongoose')

// 前端引擎
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
