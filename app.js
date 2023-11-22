const express = require('express');
const app = express();
app.use(express.static('public'));
require('dotenv').config();
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.static('public'))
const authroute = require('./routes/controller')

app.use(express.json())

app.listen(process.env.PORT, () => { console.log("app is running in 5000 port") })

mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("Application is connected to the Database")
}).catch((err) => {
    console.log(err)
})

//routes for the application
app.get('/login', (req, res) => { res.render('login') })
app.get('/signup', (req, res) => { res.render('signup') })
app.get('/', (req, res) => { res.render('home') })

app.use(authroute)



