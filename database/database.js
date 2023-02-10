const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'root', 'xa06082002@I', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection