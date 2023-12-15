const mongoose = require("mongoose")

const attendanceschema = new mongoose.Schema({
    teacherid:{
        type:String
    },
    week:{
        type:String
    },
    status:{
        type:String
    }
})

const studentschema = new mongoose.Schema({
    studentid:{
        type: String
    },
    studentname: {
        type: String
    },
    studentgender: {
        type: String
    },
    studentemail: {
        type: String
    },
    studentsection: {
        type: String
    },
    attendancestatus:[attendanceschema]
}
)

const Student = mongoose.model('student',studentschema)

module.exports = Student