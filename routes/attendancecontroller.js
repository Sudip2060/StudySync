const express = require('express')
const Router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()



































Router.post('/addattendance', async (req, res) => {
    try {
        const { studentid, studentname, sectionname, week, status } = req.body
        const token = req.cookies.jwt
        const decodedtoken = jwt.decode(token, process.env.JWT_SECRET)
        const userid = decodedtoken.id
        const previousattendance = await Attendance.find({ week, sectionname, studentid })
        if (previousattendance.length != 0) {
            res.status(200).json({ message: "data already there"})
        }
        else {
            const newuser = await Attendance.create({ userid, studentid, studentname, sectionname, week, status })
            if (newuser) {
                res.status(200).json({ newuser })
            }
            else {
                res.status(404).json({ message: "an error occured" })
            }
        }
    }
    catch (err) {
        res.status(500).json(err.message)
        console.log(err.message)
    }
})

Router.get('/attendancedata', async (req, res) => {
    try {
        const token = req.cookies.jwt
        const decodedtoken = jwt.decode(token, process.env.JWT_SECRET)
        const userid = decodedtoken.id;
        const sectionname = req.query.section
        const week = req.query.week
        const studentid = req.query.stuid
        const attendancedata = await Attendance.find({ userid, sectionname, week, studentid})
        if (attendancedata) {
            res.status(200).json(attendancedata)
        }
        else {
            res.status(404).json({ message: "an error occured" })
        }
    }
    catch (err) {
        res.status(500).json(err.message)
        console.log(err.message)
    }
})


Router.delete('/deleteattendance', async (req, res) => {
    try {
        const deletedassignment = await Attendance.deleteMany()
        if (deletedassignment) {
            res.status(200).json({ message: "deleted Sucessfully" })
        }
    }
    catch (err) {

    }

})

module.exports = Router
