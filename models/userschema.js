// Importing necessary modules and libraries
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const { json } = require('express')

// Defining a Mongoose schema for the user data
const userschema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    dateofbirth: {
        type: Date
    },
    institution: {
        type: String
    },
    phonenumber: {
        type: String
    },
    postalcode: {
        type: String
    },
    email: {
        type: String,
        required: true,
        validator: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String
    }
})

// Middleware to hash the password before saving it to the database
userschema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Static method for user login, checking email and password
userschema.statics.login = async function (email, password) {
    try {
        const user = await this.findOne({ email });
        if (user) {
            const isAuth = await bcrypt.compare(password, user.password)
            if (isAuth) {
                return user
            }
            else {
                throw Error('Incorrect Password !!!')
            }
        }
        else {
            throw Error('User with that email address not found !!')
        }
    }
    catch (error) {
        throw error;
    }
}

// Static method for updating the user's password with validation
userschema.statics.updatepassword = async function (email, oldpassword, newpassword) {
    try {
        const user = await this.findOne({ email });
        if (user) {
            const isAuth = await bcrypt.compare(oldpassword, user.password)
            if (isAuth) {
                user.password = newpassword;
                await user.save()
                return user;
            }
            else {
                throw Error('Incorrect old Password')
            }
        }
        else {
            throw Error('Check your email address')
        }
    }
    catch (error) {
        throw error;
    }
}


const User = mongoose.model('user', userschema)

module.exports = User;
