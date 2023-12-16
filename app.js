const express = require('express');
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
const app = express();

//middlewares
app.use(cookieparser())
app.use(express.static('public'));
app.use(express.json())
app.set('view engine', 'ejs');

//Routes
const usercontroller = require('./routes/usercontroller')
const routes = require('./routes/routeshandler')
const assignmentcontroller = require('./routes/assignmentcontroller');
const studentcontroller = require('./routes/studentcontroller')

//Connection to database
app.listen(process.env.PORT, () => { console.log("app is running in 5000 port") })
mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("Application is connected to the Database")
}).catch((err) => {
    console.log(err)
})

//using the routes 
app.use(routes)
app.use(usercontroller)
app.use(assignmentcontroller)
app.use(studentcontroller)