const jwt = require('jsonwebtoken');
require('dotenv').config()

//create token by passing id as the parameter
const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
}


//a function to authenticate the user
const authentication = async (req, res, next) => {
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