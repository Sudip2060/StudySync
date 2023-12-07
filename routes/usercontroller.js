const express = require('express')
const router = express.Router()
const User = require('../models/schema')
const { createtoken } = require('../Necessities/utilities')
require('dotenv').config()
const jwt = require('jsonwebtoken')

//request for signing up
router.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, dateofbirth, institution, phonenumber, postalcode, email, password } = req.body
        const user = await User.create({ firstname, lastname, dateofbirth, institution, phonenumber, postalcode, email, password })
        const token = createtoken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        res.status(200).json({ user })
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
<<<<<<< Updated upstream
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        res.status(201).json({ message: 'login Successful ', token })
    }
    catch (err) {
        res.status(404  ).send(err.message)
=======
        res.cookie('jwt', token, { httpOnly: true, maxAge: 2 * 60 *60 * 1000 })
        res.status(201).json({message:"login Successful"})
    }
    catch (err) {
        res.status(404).json(err.message)
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
            const decodedtoken = jwt.verify(token,process.env.JWT_SECRET);
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
router.post('/passwordchange', async (req, res) => {
    try {
        const { email, oldpassword, newpassword } = req.body;
        const user = await User.updatepassword(email, oldpassword, newpassword)
        if(user){
            res.status(200).json("Password Changed Sucessfully")
        }
        else{
            res.status(404).json({message:"an error "})
        }

    }
    catch (err) {
        res.status(500).json(err.message ) 
>>>>>>> Stashed changes
    }
})

//request for updating the account settings
router.put('/updateaccount', async (req, res) => {
    try {
        const { email, phonenumber, postalcode } = req.body
        const token = req.cookies.jwt
        const decodedtoken = jwt.verify(token,process.env.JWT_SECRET);
        const userid = decodedtoken.id
        const updateduser = await User.findByIdAndUpdate(userid,{
            email:email,
            phonenumber:phonenumber,
            postalcode:postalcode
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


router.get('/users/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const user = await User.findById(userid)
        if (user) {
            res.status(200).json({ user })
        }
        else {
            res.status(404).json({ message: "user not found" })
        }
    }
    catch (err) {
        res.status(500).json("An error occured")
        console.log(err.message)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const userid = req.params.id
        const deleteduser = await User.findByIdAndDelete(userid)
        if (deleteduser) {
            res.status(200).json({ message: "user deleted sucessfully" })
        }
        else {
            res.status(404).json({ message: "error deleting the user" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "an error occured" })
        console.log(err.message)
    }
})


router.get('/users', async (req, res) => {
    try {
        const userdata = await User.find()
        if (userdata) {
            res.status(200).json(userdata)
        }
        else {
            res.status(404).json({ message: "no users registered" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "an error occured" })
        console.log(err)
    }
})

router.delete('/users', async (req, res) => {
    try {
        const deleteduser = await User.deleteMany()
        if (deleteduser) {
            res.status(200).json({ message: "all users deleted Sucessfully" })
        }
        else {
            res.status(404).json({ message: "en error occured" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "an error occured" })
        console.log(err)
    }
})


router.put('/users/:id', async (req, res) => {
    try {
        const { firstname, lastname, dateofbirth, institution, phonenumber, postalcode, email, password } = req.body
        const userid = req.params.id
        const updateduser = await User.findByIdAndUpdate(userid, req.body)
        if (updateduser) {
            res.status(201).json({ message: "user updated sucessfully" } || updateduser)
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
module.exports = router


