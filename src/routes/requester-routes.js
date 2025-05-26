require("dotenv").config
const express = require("express");
const router = express.Router()
const { Op } = require("sequelize")
const { Ticket, Agent, Requester, Comment } = require("../models")

router.post('/requester/login', passport.authenticate('requester-local'), async (req, res) => {
  try {
    const user = req.user
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' })
  }
})

router.post('/requester/register', async (req, res) => {
  try {
    const { requester_email, password } = req.body
    const requester = await Requester.create({ requester_email, password })
    res.json(requester)
  } catch (err) {
    res.status(400).json({ message: 'Error creating requester' })
  }
})