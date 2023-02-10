const express = require('express')
const app = express()
const connection = require('./database/database')
const session = require('express-session')


const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const usersController = require('./user/UsersController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./user/User')



// confirm connection to database
connection.authenticate().then(() => {
    console.log('Conexão feita com o banco de dados')
}).catch(err => {
    console.log(err)
})
// view engine - work with HTML pages
app.set('view engine', 'ejs') 
//session
app.use(session({
    secret: "jsiofhshda77984802jadasbnaçsnvae",
    cookie: {maxAge: 30000}, 
    resave: true, 
    saveUninitialized: true
}))
// working with forms
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// static archives
app.use(express.static('public'))

app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', usersController)

app.get('/session', (req, res) => {
    req.session.treinamento = 'formacao node.js'
    req.session.ano = 2023

    res.send('Sessão gerada')
})

app.get('/leitura', (req, res) => {
    res.json({
       treinamento: req.session.treinamento,
       ano: req.session.ano
    })
})



app.get('/', (req, res) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories})
        })
    })
})

app.get('/:slug', (req, res) => {
    let slug = req.params.slug

    Article.findOne({ // procurando o artigo onde o slug(parametro) é igual ao slug(dentro do banco de dados)
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', {article: article, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}] // (join) procura todos os artigos dentro dessa categoria
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.listen(8081, () => {
    console.log('Servidor rodando')
})