const { DataTypes } = require('sequelize')
const connection = require('../database/database')

const User = connection.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

//User.sync({force:false})

module.exports = User