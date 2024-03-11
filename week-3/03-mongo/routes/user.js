const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const { Course } = require("../db");
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    let response = await User.create({
        username,
        password
    })
    res.json({
        msg : "user created successfully"
    });

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    let response = await Course.find({});
    res.json({
        courses : response
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    try{
        await User.updateOne({
            username: username,
        },{ 
            "$push" : {
                purchasedCourses : courseId
            }
        });
        res.json({
            "msg" : "course bought successfully"
        });
    }catch(e){
        console.log(e);
    }    
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({
        username,
    });
    const courses = await Course.find({
        _id : {
            '$in' : user.purchasedCourses
        }
    });
    res.json({
        'purchasedCourses' : courses
    })

});

module.exports = router