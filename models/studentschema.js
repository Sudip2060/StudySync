const mongoose = require("mongoose")
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
    }
}
)

const Student = mongoose.model('student',studentschema)

module.exports = Student