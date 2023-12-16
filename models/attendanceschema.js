const mongoose = require('mongoose')
const attendanceschema = new mongoose.Schema({
    userid:{
        type:String
    },
    week :{
        type:String
    },
    sectionname :{
        type:String
    },
    studentid:{
        type:String
    },
    studentname :{
        type:String
    },
    status:{
        type:String
    }  
})

const Attendance = mongoose.model('attendance',attendanceschema)
module.exports = Attendance;