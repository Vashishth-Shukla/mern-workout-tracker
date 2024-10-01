const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const login = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled!')
    }
    // if user exists
    const user = await User.findOne({ email })
    if (!user) {
        throw Error('Incorrect email!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid Passsword')
    }
    
    return user
}

const signup = async function(email, password) {  // to use 'this' we have to make it a function and the arrow function does not work
    

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled!')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid!')
    }
    // if user exists
    const existes = await User.findOne({ email })
    if (existes) {
        throw Error('Email is already in use!')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough!')
    }



    const salt = await bcrypt.genSalt(10) // default value is also 10 the higher the value takes longer to login
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({ email, password: hash })
    return user

}

module.exports = { login, signup } 
