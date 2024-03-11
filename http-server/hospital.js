const express = require("express");

let users = [{
    name : "john",
    kidneys : [{
        healthy :false
    }]
}];

const app = express();

app.use(express.json());

app.get("/",function(req,res){
    let johnKidneys = users[0].kidneys;
    let numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    let num = johnKidneys.filter(function(el){
        if(el.healthy){
            return el;
        }
    });
    numberOfHealthyKidneys = num.length;
    let numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post("/",(req,res) => {
    const isHealthy = req.body.isHealthy;//we are getting input from the body
    users[0].kidneys.push({
        healthy : isHealthy
    });
    res.json({
        msg : "done!",
    })
});

app.put("/",function(req,res){
    let AtleastOneUnhealthy = false;
    AtleastOneUnhealthy = checkForUnhealthy(users);
    if(AtleastOneUnhealthy){
        users[0].kidneys = users[0].kidneys.filter((el) => {
            return el.healthy = true;
        });
        res.json({});
    }else{
        res.status(411).json({msg : "you have no unhealthy kidneys"});
    }
});

app.delete("/",function(req,res){
    let AtleastOneUnhealthy = false;
    AtleastOneUnhealthy = checkForUnhealthy(users);
    if(AtleastOneUnhealthy){
        users[0].kidneys = users[0].kidneys.filter((el) => {
            if(el.healthy){
                return el;
            }
        });
        res.json({msg : "unhealthy kidney removed"});
    }else{
        res.status(411).json({msg : "you have no unhealthy kidneys"});
    }
});

function checkForUnhealthy(users){
    for(let i =0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            return true;
        }
    }
}

app.listen(3000);