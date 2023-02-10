const {DataTypes} = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, slug: {
        type: DataTypes.STRING,
        allowNull: false
    }, body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) // UMA categoria tem muitos artigos
Article.belongsTo(Category) // UM artigo pertence a uma categoria

//Article.sync({force: true})


module.exports = Article