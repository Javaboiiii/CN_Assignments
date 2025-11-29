require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connect = require("./middlewares/connection") 
const { addUser, verifyUser } = require("./controllers/user_controllers") 
const { getBook, saveBook } = require("./controllers/book_controllers")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connect;

const PORT = process.env.PORT | 8000; 


app.get('/', (req, res) => {
    res.send("Welcome to bookStore")
})

app.post("/login", async (req, res) => {
    const body = req.body
    const response = await verifyUser(body); 
    res.send(response) 
})

app.post("/register", async (req, res) => {
    const body = req.body
    const response = await addUser(body); 
    res.send(response)
})

app.post("/book", async (req, res) => {
    const body = req.body
    const response = await saveBook(body)
    res.send(response)
})

app.get("/books", async (req, res) => {
    const username = req.query.username
    const response = await getBook({ username })
    res.send(response) 
})


app.listen(PORT, () => {
    console.log(`Listening at the PORT ${PORT}`)
})