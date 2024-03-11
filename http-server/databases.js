const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect("mongodb+srv://admin:practice%20@cluster0.7xrssdb.mongodb.net/newUser");

const user = mongoose.model("users",{name: String, email : String ,password : String, })

app.post("/signup",async function(req,res){
    email = req.body.email;
    personName = req.body.name;
    password = req.body.password;

    
    try{
        let existingUser = await user.findOne({email : email});
        if(existingUser){
            return res.status(400).json({
                "msg" : "email already exists"
            });
        }else{

            const userData = new user({
                name : personName,
                email : email,
                password : password
            });
            
            userData.save();

            return res.json({
                "msg" : "user saved successfully"
            });
        }
    }
    catch(err){
        return res.json({
            "msg" : "internal server error"
        })
    }
})

app.listen(3000);



