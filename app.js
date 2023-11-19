const express = require('express');
const app = express();
app.use(express.static('public'));
require('dotenv').config();
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.listen(process.env.PORT, () => { console.log("app is running in 5000 port") })

app.get('/login', (req, res) => { res.render('login') })

app.get('/signup', (req, res) => {
    res.render('signup')
})

mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("application is connected to Database")
}).catch((err) => {
    console.log(err)
})



