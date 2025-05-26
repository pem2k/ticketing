const ticket = require("./ticket")
const agent = require("./agent")
const requester = require("./requester")
const comment = require("./comment")

agent.hasMany(ticket)
requester.hasMany(ticket)
ticket.hasMany(comment)

ticket.belongsTo(agent)
ticket.belongsTo(requester)

comment.belongsTo(ticket)

module.exports = {
    ticket,
    agent,
    requester,
    comment
}