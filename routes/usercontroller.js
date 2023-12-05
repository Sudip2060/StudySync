const express = require('express')
const router = express.Router()
const User = require('../models/schema')
const { createtoken } = require('../Necessities/utilities')
require('dotenv').config()


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


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.login(email, password)
        const token = createtoken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        res.status(201).json({ message: 'login Successful ', token })
    }
    catch (err) {
        res.status(404  ).send(err.message)
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


