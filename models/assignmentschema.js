const mongoose = require('mongoose')
const assignmentschema = new mongoose.Schema({

    assignmentname: {
        type: String
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
    instructions: {
        type: String
    }
})

const Assignment = mongoose.model('assignment',assignmentschema);

module.exports = Assignment;