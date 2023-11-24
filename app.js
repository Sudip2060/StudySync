const express = require('express');
const app = express();
app.use(express.static('public'));
require('dotenv').config();
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.static('public'))
const usercontroller = require('./routes/controller')
const routes = require('./routes/routeshandler')
const assignmentcontroller = require('./routes/assignmentcontroller')



app.use(express.json())

app.listen(process.env.PORT, () => { console.log("app is running in 5000 port") })

mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("Application is connected to the Database")
}).catch((err) => {
    console.log(err)
})

app.use(routes)
app.use(usercontroller)
app.use(assignmentcontroller)



