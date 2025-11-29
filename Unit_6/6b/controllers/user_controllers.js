const User = require("../models/user_model")


const verifyUser = async ({username, password}) => { 

    try{
        const query = User.where({username: username} )

        const user = await query.findOne()

        if(!user){
            return {
                "message": "User doesnot exists"
            }
        }

        if(password != user.password){
            return {
                "message": "Username or password incorrect" 
            }
        }

        return {
            "status": "success", 
            "message": "User is verified" 
        }
    }catch{
        return {
            "status": "failed", 
            "message": "Failed to verify user" 
        }
    }
}

const addUser = async ({username, password}) => { 

    try{
        const query = User.where({username: username} )

        const user = await query.findOne()
        if(user){ 
            return {
                "message": "User already exist" 
            }
        }

        const entry = new User({username: username, password: password}) 

        await entry.save() 

        return {
            "status": "success", 
            "message": "User saved Successfully" 
        }
    }catch{
        return {
            "status": "failed", 
            "message": "Failed to save User" 
        }
    }
}


module.exports = { verifyUser, addUser } 