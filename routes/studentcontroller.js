const express = require('express')
const Router = express('Router')
const Student = require('../models/Studentschema')
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

/*A put request which will check if the student has the week and status. If there exists a week and it status then it will update the status if not then it will create a new attendance status*/
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














module.exports = Router;