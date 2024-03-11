const express = require("express");
const app = express();

function ageCheckMiddleware(req,res,next){
    const age = req.query.age;
    if(age>=14){
        next();
    }else{
        res.status(400).json({
            "msg" : "you aren't old enough to ride the ride"
        });
    }
}

app.get("/ride1",ageCheckMiddleware, function(req,res){
    res.json({
        "msg" : "ride1 completed"
    })
})

app.get("/ride2",ageCheckMiddleware, function(req,res){
    res.json({
        "msg" : "ride2 completed"
    })
})

app.listen(3000);