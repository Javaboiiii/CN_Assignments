require('dotenv').config()

const db = require('mongoose') 

const CONNECTION_STRING = process.env.DB_KEY || "no key" 

console.log(`connection string is ${CONNECTION_STRING}`)

const connect = async () => {
    try{
        await db.connect(CONNECTION_STRING); 
        console.log("Connected to db successfully") 
    }catch{
        console.log("Failed to connect") 
    }
}


module.exports = connect()
