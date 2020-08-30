const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('hello world')
    // res.render('index')
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})


// const generatorRubbishTalk = require('./generator_rubbishtalk')
// const exphbs = require('express-handlebars')
// const bodyParser = require('body-parser')

// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
// }))
// app.set('view engine', 'handlebars')
// app.use(bodyParser.urlencoded({extended: true}))
// app.get('/', (req, res) => {
//     res.render('index')
// })
// app.post('/', (req, res) => {
//     const options = req.body
//     const rubbishTalk = generatorRubbishTalk(req.body)
//     res.render('index', {rubbishTalk: rubbishTalk})
// })

