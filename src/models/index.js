const sequelize = require('../db/schema.js');
const ticket = require("./ticket")
const agent = require("./agent")
const requester = require("./requester")
const comment = require("./comment")

ticket.belongsTo(agent, { foreignKey: 'agent_id' });
agent.hasMany(ticket, { foreignKey: 'agent_id' });

ticket.belongsTo(requester, { foreignKey: 'requester_id' });
requester.hasMany(ticket, { foreignKey: 'requester_id' });

ticket.hasMany(comment, { foreignKey: 'ticket_id' });
comment.belongsTo(ticket, { foreignKey: 'ticket_id' });

module.exports = { ticket, agent, requester, comment };