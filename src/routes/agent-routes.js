require("dotenv").config
const express = require("express");
const router = express.Router()
const { Op } = require("sequelize")
const { Ticket, Agent, Requester, Comment } = require("../models")
const passport = require('../config/passport')

// Agent routes

router.get('/test', (req, res) => {
  res.json({ message: 'Test complete' });
});

router.post('/agent/login', passport.authenticate('agent-local'), async (req, res) => {
  try {
    const user = req.user
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' })
  }
})

router.post('/register', async (req, res) => {
  try {
    console.log("register function is hitting")
    const { agent_email, agent_password, agent_name  } = req.body
    const agent = await agent.create({ agent_email, agent_password, agent_name })
    res.json(agent)
  } catch (err) {
    res.status(400).json({ message: 'Error creating agent' })
  }
})

router.get('/all', async (req, res) => {
  try {
    const agents = await agent.findAll({
      attributes: { exclude: ['agent_password'] }
    });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving agents' });
  }
});

router.get('/:agent_id', async (req, res) => {
  try {
    const query = req.query;
    const conditions = {};

    if (query.agent_id) {
      conditions.agent_id = query.agent_id;
    }

    if (query.agent_email) {
      conditions.agent_email = query.agent_email;
    }

    if (query.agent_name) {
      conditions.agent_name = query.agent_name;
    }

    if (query.agent_role) {
      conditions.agent_role = query.agent_role;
    }

    const agent = await agent.findOne({
      where: conditions,
      attributes: { exclude: ['agent_password'] }
    });

    if (!agent) {
      res.status(404).json({ message: 'Agent not found' });
    } else {
      res.json(agent);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving agent' });
  }
});

module.exports = router