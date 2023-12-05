const express = require('express')
const Router = express.Router()
const jwt = require('jsonwebtoken')

const {authentication} = require('../Necessities/utilities')

Router.get('/login', (req, res) => { res.render('login') })
Router.get('/signup', (req, res) => { res.render('signup') })
Router.get('/', authentication,(req, res) => { res.render('home') })
Router.get('/sections', authentication, (req, res) => { res.render('section') })
Router.get('/assignments', authentication, (req, res) => {res.render('assignment') })
module.exports = Router;