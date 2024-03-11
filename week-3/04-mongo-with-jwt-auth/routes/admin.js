const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const router = Router();
const zod = require("zod");
const { Admin,Course } = require("../db");
const { usernameSchema, passwordSchema } = require("../inputValidator");
const {JWT_SECRET} = require("../config");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    try{
    //input validation
    const response =  usernameSchema.safeParse(username);
    const response1 = passwordSchema.safeParse(password); 
    
    
    if(!response.success){
        return res.status(400).json({
            "msg" : "worng format of username"
        });
    }

    //checking if username already exists
    const adminAlreadyExists = await Admin.findOne({
        username,
    });
    if(adminAlreadyExists){
        return res.status(400).json({
            msg : "username already exists"
        });
    }
    

    if(!response1.success){
        return res.status(400).json({
            "msg" : "worng format of password"
        });
        
    }

    //creating a new entry
    const creation = await Admin.create({
        username,
        password
    })
    return res.json({
        "msg" : "Admin created successfullly"
    });
    }catch(e){
        console.log(e);
        return res.json({
            "msg" : "internal server error"
        });
    }
    
    
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const response = await Admin.findOne({
        username,
        password
    });
    if(!response){
        return res.status(400).json({
            "msg" : "wrong username or password"
        });
    }
    let token = jwt.sign({
        username,
        "type" : "admin",
    }, JWT_SECRET);
    res.json({
        token,
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const response = await Course.create({
        title,
        description,
        price
    }); 
    res.json({
        'msg': "course created successfully",
        "courseId" : response._id
    });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({
        courses,
    });
});

module.exports = router;