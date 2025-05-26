const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection.js');

class comment extends Model {}

comment.init({ 
comment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  ticket_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ticket',
      key: 'ticket_id'
    }
  },

  agent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'agent',
      key: 'agent_id'
    }
  },

  requester_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'requester',
      key: 'requester_id'
    }
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },

  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, 

{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment'
});

module.exports = comment