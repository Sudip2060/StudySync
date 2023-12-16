const express = require('express')
const Router = express.Router()
const jwt = require('jsonwebtoken')

const { authentication } = require('../Necessities/utilities')

Router.get('/login', (req, res) => { res.render('loginsignuppages/login') })
Router.get('/signup', (req, res) => { res.render('loginsignuppages/signup') })
Router.get('/', authentication, (req, res) => { res.render('home') })
Router.get('/attendance',authentication,(req,res)=>{res.render('attendance')})
Router.get('/classlist',authentication,(req,res)=>{res.render('classlist')})

Router.get('/sections', authentication, (req, res) => { res.render('assignmentpages/section') })
Router.get('/assignments', authentication, (req, res) => { res.render('assignmentpages/assignment') })
Router.get('/profile', authentication ,(req, res) => { res.render('profilepages/Dashboard.ejs') })
Router.get('/changepassword', authentication,(req,res)=>{res.render('profilepages/changepassword.ejs')})
Router.get('/accountsettings', authentication,(req,res)=>{res.render('profilepages/accountsettings.ejs')})
Router.get('/editassignment', authentication,(req,res)=>{res.render('assignmentpages/editassignment')})


module.exports = Router; 