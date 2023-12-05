const jwt = require('jsonwebtoken');
const User = require('../models/schema')
require('dotenv').config()

const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
}

const authentication = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedtoken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            }
            else {
                next()
            }
        })
    }
    else {
        console.log('token undefined')
        res.redirect('/login')
    }
}

module.exports = { createtoken, authentication };