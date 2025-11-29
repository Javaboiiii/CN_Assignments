const db = require("mongoose"); 
const { Schema } = db 

const bookSchema = new Schema({
    title: String, 
    author: String, 
    content: String 
})

const Book = db.model('Book', bookSchema) 

module.exports = Book
