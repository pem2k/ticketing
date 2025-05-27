const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const agent = require('../models/agent')
const requester = require('../models/requester')

passport.use('agent-local', new LocalStrategy({
  usernameField: 'agent_email',
  passwordField: 'password'
}, (agent_email, password, done) => {
  agent.findOne({ where: { agent_email } })
    .then((agent) => {
      if (!agent) return done(null, false)
      agent.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) return done(null, false)
        return done(null, agent)
      })
    })
    .catch((err) => done(err))
}))

passport.use('requester-local', new LocalStrategy({
  usernameField: 'requester_email',
  passwordField: 'password'
}, (requester_email, password, done) => {
  Requester.findOne({ where: { requester_email } })
    .then((requester) => {
      if (!requester) return done(null, false)
      requester.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) return done(null, false)
        return done(null, requester)
      })
    })
    .catch((err) => done(err))
}))

passport.use('agent-jwt', new JwtStrategy({
  jwtFromRequest: (req) => req.cookies.jwt,
  secretOrKey: 'your-secret-key',
  algorithms: ['HS256']
}, (payload, done) => {
  agent.findByPk(payload.sub)
    .then((agent) => {
      if (!agent) return done(null, false)
      return done(null, agent)
    })
    .catch((err) => done(err))
}))

passport.use('requester-jwt', new JwtStrategy({
  jwtFromRequest: (req) => req.cookies.jwt,
  secretOrKey: 'your-secret-key',
  algorithms: ['HS256']
}, (payload, done) => {
  Requester.findByPk(payload.sub)
    .then((requester) => {
      if (!requester) return done(null, false)
      return done(null, requester)
    })
    .catch((err) => done(err))
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Agent.findByPk(id)
    .then((agent) => {
      if (!agent) {
        Requester.findByPk(id)
          .then((requester) => {
            if (!requester) return done(null, false)
            return done(null, requester)
          })
          .catch((err) => done(err))
      }
      return done(null, agent)
    })
    .catch((err) => done(err))
})

module.exports = passport