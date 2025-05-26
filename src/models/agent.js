const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection.js');

class agent extends Model {async setPassword(password) {
    const salt = await bcrypt.genSalt(10);
    this.agent_password = await bcrypt.hash(password, salt);
  }

async validatePassword(password) {
    return await bcrypt.compare(password, this.agent_password);
  }
}


agent.init(
    { 
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
        agent_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_role:{
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_team:{
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_password:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'agent',
    }
)


module.exports = agent