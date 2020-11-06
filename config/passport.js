const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('../models/users')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    users.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This mail is not registered!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'email or Password incorrect.' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    users.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
