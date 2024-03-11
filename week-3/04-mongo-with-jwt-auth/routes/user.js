const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db");
const {JWT_SECRET} = require("../config");
const {usernameSchema,passwordSchema} = require("../inputValidator");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
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
    const userAlreadyExists = await User.findOne({
        username,
    });
    if(userAlreadyExists){
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
    const creation = await User.create({
        username,
        password
    })
    return res.json({
        "msg" : "User created successfullly"
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
    const response = await User.findOne({
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
        "type" : "user",
    }, JWT_SECRET);
    res.json({
        token,
    });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        courses,
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    const response = await User.updateOne({
        username : decodedValue.username,
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    });
    res.json({
        "msg" : "course bought successfully"
    });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    
    try{
        const token = req.headers.authorization;
        const words = token.split(" ");
        const jwtToken = words[1];
        const decodedValue = jwt.verify(jwtToken , JWT_SECRET);
        console.log(decodedValue.username);
        const userData = await User.findOne({
            username : decodedValue.username
        }); 
        const courses = await Course.find({
            _id : {
                "$in" : userData.purchasedCourses
            }
        });
        res.json({
            'purchasedCourses' : courses
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            "msg" : "internal server error"
        });
    }
    
});

module.exports = router