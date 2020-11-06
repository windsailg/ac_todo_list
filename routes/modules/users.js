const express = require('express')
const router = express.Router()

const passport = require('passport')

const users = require('../../models/users')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  users.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return users.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

// router.post('/', (req, res) => {
//   const name = req.body.name
//   return todo.create({ name })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })
module.exports = router
