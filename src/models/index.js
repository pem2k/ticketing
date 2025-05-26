const ticket = require("./ticket")
const agent = require("./agent")
const requester = require("./requester")

agent.hasMany(ticket)
requester.hasMany(ticket)
ticket.belongsTo(agent)
ticket.belongsTo(requester)

module.exports = {
    ticket,
    agent,
    requester
}