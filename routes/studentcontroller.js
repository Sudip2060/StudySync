const express = require('express')
const Router = express('Router')
const Student = require('../models/studentschema')
const jwt = require('jsonwebtoken')
require('dotenv').config()


//A request to retrieve all the students data
Router.get('/studentdata', async (req, res) => {
    try {
        const data = await Student.find()
        if (data) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json({ message: "no data found" })
        }
    }
    catch (err) {
        res.status(500).json(err.message)
        console.log(err.message)
    }
})

//A request to retrive all the students data based on the section
Router.get('/students', async (req, res) => {
    try {
        const studentsection = req.query.section
        const token = req.cookies.jwt
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET)
        const teacherid = decodedtoken.id
        const studentData = await Student.find({studentsection});

        const filteredStudentData = studentData.map((student) => {
            const filteredAttendance = student.attendancestatus.filter(
                (attendance) => attendance.teacherid === teacherid
            );

            return {
                studentid: student.studentid,
                studentname: student.studentname,
                studentgender: student.studentgender,
                studentemail: student.studentemail,
                studentsection: student.studentsection,
                attendancestatus: filteredAttendance,
            };
        });
        res.status(200).json(filteredStudentData)
    }
    catch (err) {
        res.status(500).json(err.message)
        console.log(err.message)
    }
})


Router.put('/attendancedata', async (req, res) => {
    try {
        const { studentsection, studentid, week, status } = req.body;
        const token = req.cookies.jwt
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET)
        const teacherid = decodedtoken.id
        const existingStudent = await Student.findOne({
            studentsection,
            studentid,
            'attendancestatus.teacherid': teacherid,
            'attendancestatus.week': week
        });

        if (existingStudent) {
            const updatedData = await Student.findOneAndUpdate(
                {
                    studentsection,
                    studentid,
                    'attendancestatus.teacherid': teacherid,
                    'attendancestatus.week': week
                },
                {
                    $set: {
                        'attendancestatus.$.status': status,
                    }
                },
                { new: true }
            );
            res.status(200).json(updatedData);
        } else {
            const updatedData = await Student.findOneAndUpdate(
                { studentsection, studentid },
                {
                    $push: {
                        attendancestatus: {
                            teacherid,
                            week,
                            status
                        }
                    }
                },
                { new: true, upsert: true }
            );
            res.status(200).json(updatedData);
        }
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})




















Router.post('/students', async (req, res) => {
    try {
        const { studentid, studentname, studentgender, studentemail, studentsection } = req.body
        const newstudent = await Student.create({ studentid, studentemail, studentgender, studentname, studentsection })
        if (newstudent) {
            res.status(200).json(newstudent)
        }
        else {
            res.status(404).json({ message: 'an error occured' })
        }
    }
    catch (err) {
        res.status(500).json(err.message)
        console.log(err.message)

    }
})













Router.post('/morestudents', async (req, res) => {
    try {
        const studentdata = req.body
        const createdstudents = []
        for (const student of studentdata) {
            const { studentid, studentname, studentgender, studentemail, studentsection } = student
            const newstudent = await Student.create({ studentid, studentname, studentgender, studentemail, studentsection })
            createdstudents.push(newstudent)
        }
        if (createdstudents.length > 0) {
            res.status(200).json(createdstudents)
        }
        else {
            res.status(404).json({ message: "no data found" })
        }
    }
    catch (err) {
        res.status(500).json(err.message)
        console.log(err.message)

    }
})








Router.delete('/students', async (req, res) => {
    try {
        const deletedstudents = await Student.deleteMany()
        if (deletedstudents) {
            res.status(200).json({ message: 'All Students deleted' })
        }
    }
    catch (err) {

    }
})




module.exports = Router;