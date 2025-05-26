require("dotenv").config
const express = require("express");
const router = express.Router()
const { Op } = require("sequelize")
const { Ticket, Agent, Requester, Comment } = require("../models")


//get routes

//get all tickets
router.get("/", async (req, res) => {
    try {
        const ticketData = await Ticket.findAll({
            include: [
                { model: Agent, attributes: { exclude: ["password"] } },
                { model: Requester, attributes: { exclude: ["password"] } },
                { model: Comment, attributes: { exclude: ["password"] } }
            ]
        })
        return res.status(200).json(ticketData)
    } catch (err) {
        if (err) {
            console.log(err)
            res.status(500).json(`Internal server error: ${err}`)
        }
    }
})

//filter tickets
router.get("/filterTickets", async (req, res) => {
  try {
    const query = req.query;
    const conditions = [];

    if (query.agent_id) {
      conditions.push({ agent_id: query.agent_id });
    }

    if (query.status) {
      conditions.push({ status: query.status });
    }

    if (query.requester_id) {
      conditions.push({ requester_id: query.requester_id });
    }

    if (query.priority) {
      conditions.push({ priority: query.priority });
    }

    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: conditions,
      },
    });
    return res.status(200).json(tickets);
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).json(`Internal server error: ${err}`);
    }
  }
});

//get all tickets assigned to logged in agent or requester
router.get("/myTickets", async (req, res) => {
  try {
    const agentId = req.agentId; 
    const requesterId = req.requesterId; 

    const tickets = await Ticket.findAll({
      where: {
        [Op.or]: [
          { agent_id: agentId },
          { requester_id: requesterId },
        ],
      },
    });
    return res.status(200).json(tickets);
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).json(`Internal server error: ${err}`);
    }
  }
});


//post routes
router.post("/newTicket", async (req, res) => {
  try {
    const newTicket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      requester_id: req.body.requester_id,
    });
    return res.status(201).json(newTicket);
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(500).json(`Internal server error: ${err}`);
    }
  }
});

//patch routes

module.exports = router