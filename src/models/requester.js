const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection.js');

class requester extends Model {}

class requester extends Model {
    async setPassword(password) {
    const salt = await bcrypt.genSalt(10);
    this.agent_password = await bcrypt.hash(password, salt);
  }

async validatePassword(password) {
    return await bcrypt.compare(password, this.agent_password);
  }
}


requester.init(
    { 
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
        requester_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        requester_role:{
            type: DataTypes.STRING,
            allowNull: false
        },
        requester_team:{
            type: DataTypes.STRING,
            allowNull: false
        },
        requester_email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        requester_password:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'requester',
    }
)

module.exports = requester