const express = require('express')
const router = express.Router()
const User = require('../models/schema')

const creatuser = router.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, dateofbirth, institution, phonenumber, postalcode, email, password } = req.body
        const user = await User.create({ firstname, lastname, dateofbirth, institution, phonenumber, postalcode, email, password })
        res.status(200).json({ user })
    }
    catch (err) {
        res.status(500).json("Error")
        console.log(err.message)
    }
})


module.exports = creatuser;


