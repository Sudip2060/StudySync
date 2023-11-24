const express = require('express')
const Router = express.Router()

Router.get('/login', (req, res) => { res.render('login') })
Router.get('/signup', (req, res) => { res.render('signup') })
Router.get('/', (req, res) => { res.render('home') })
Router.get('/sections', (req, res) => { res.render('section') })
Router.get('/assignments', (req, res) => {res.render('assignment') })


module.exports = Router;