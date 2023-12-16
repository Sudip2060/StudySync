const express = require('express')
const router = express.Router()
const User = require('../models/userschema')
const { createtoken } = require('../Necessities/utilities')
require('dotenv').config()
const jwt = require('jsonwebtoken')

//request for signing up
router.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, dateofbirth, institution, phonenumber, postalcode, email, password } = req.body
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            res.status(400).json({ message: "User with that email address already registered" })
        }
        else {
            const user = await User.create({ firstname, lastname, dateofbirth, institution, phonenumber, postalcode, email, password })
            const token = createtoken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
            res.status(200).json({ user })
        }

    }
    catch (err) {
        res.status(500).json("Error")
        console.log(err.message)
    }
})

//request for login 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.login(email, password)
        const token = createtoken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        res.status(201).json({ message: 'login Successful ', token })
    }
    catch (err) {
        res.status(404).json(err.message)
    }
})
//request for updating the account settings
router.put('/updateaccount', async (req, res) => {
    try {
        const { email, phonenumber, postalcode } = req.body
        const token = req.cookies.jwt
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        const userid = decodedtoken.id
        const updateduser = await User.findByIdAndUpdate(userid, {
            email: email,
            phonenumber: phonenumber,
            postalcode: postalcode
        })
        if (updateduser) {
            res.status(201).json({ message: "user updated sucessfully" })
        }
        else {
            res.status(404).json({ message: "no user found with the given id" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "an error occured" })
        console.log(err)
    }
})


//request for logout
router.post('/logout', async (req, res) => {
    try {
        const logoutstatus = res.clearCookie('jwt')
        if (logoutstatus) {
            res.status(200).json({ message: "logout Successful" })
        }
        else {
            res.status(404).json({ message: "an error occured" })
        }
    }
    catch (err) {
        console.log(err)
    }
})
//request for retrieveing the userdetails by decoding the token
router.get('/userdetails', async (req, res) => {
    try {
        const token = req.cookies.jwt
        if (token) {
            const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
            const userid = decodedtoken.id
            const user = await User.findById(userid)
            res.status(200).json(user)
        } else {
            res.status(400).json({ message: "an error occured" });
        }
    } catch (err) {
        res.status(500).json(err.message);
        console.log(err.message);
    }
});
//request for updating the password
router.put('/passwordchange', async (req, res) => {
    try {
        const { email, oldpassword, newpassword } = req.body;
        const user = await User.updatepassword(email, oldpassword, newpassword)
        if (user) {
            res.status(200).json("Password Changed Sucessfully")
        }
        else {
            res.status(404).json({ message: "an error " })
        }
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})





module.exports = router