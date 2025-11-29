const Book  = require("../models/book_model") 

const saveBook = async ({title, author, content}) => { 


    try{

        const query = Book.where({title: title}) 
        const book = await query.find() 

        if(book){
            return {
                "status": "failed", 
                "message": "Book already exists" 
            }
        }

        const newBook = new Book({
            title: title, 
            author: author, 
            content: content 
        }) 
    
    
        await newBook.save(); 
        return {
            "status": "success", 
            "message": "Book saved successfully" 
        }
    }catch{
        return {
            "status": "failed", 
            "message": "Failed to save the book" 
        }
    }

}

const getBook = async ({username}) => {
    
    
    try{
        const query = Book.where({author: username}) 
    
        const books = await query.find() 
        console.log(books)
        if(!books){ 
            return {
                "status": "failed", 
                "message": "Author not found" 
            }
        }
        
        return {
            "status": "success", 
            "books": books 
        }

    }catch{
        return {
            "status": "failed", 
            "message": "Author not Found" 
        }
    }
}


module.exports = { saveBook, getBook } 