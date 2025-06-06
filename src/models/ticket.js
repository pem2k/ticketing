const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection.js');

class ticket extends Model {}

ticket.init({ 

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM,
    values: ['Open', 'In progress', 'Awaiting requester', 'Awaiting Outside Vendor', 'Resolved', 'Closed'],
    defaultValue: 'Open'
  },

  priority: {
    type: DataTypes.ENUM,
    values: ['low', 'medium', 'high'],
    defaultValue: 'medium'
  },

  agent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'agent',
      key: 'id'
    }
  },

  requester_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'requester',
      key: 'id'
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

}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'ticket'
});

module.exports = ticket