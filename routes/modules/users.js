const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/', (req, res) => {
  const name = req.body.name
  return todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
