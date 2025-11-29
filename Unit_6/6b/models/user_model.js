const db = require('mongoose') 
const { Schema } = db

const userSchema = new Schema({
    username: String, 
    password: String 
})


const User = db.model('User', userSchema)

module.exports = User; 