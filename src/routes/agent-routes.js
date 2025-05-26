require("dotenv").config
const express = require("express");
const router = express.Router()
const { Op } = require("sequelize")
const { Ticket, Agent, Requester, Comment } = require("../models")
const passport = require('../config/passport')

// Agent routes

router.post('/agent/login', passport.authenticate('agent-local'), async (req, res) => {
  try {
    const user = req.user
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' })
  }
})

router.post('/agent/register', async (req, res) => {
  try {
    const { agent_email, password } = req.body
    const agent = await Agent.create({ agent_email, password })
    res.json(agent)
  } catch (err) {
    res.status(400).json({ message: 'Error creating agent' })
  }
})