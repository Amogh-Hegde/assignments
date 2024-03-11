const express = require("express");
const zod = require("zod")
const app = express();

app.use(express.json());

//zod.dev for documentation
const schema = zod.array(zod.number());

//if you want input of this type
//{
//  email : stirng => which has @ and stuff
//  password : atleast 8 letters 
//  country : "IN","US"
//}
//

const schema1 = zod.object({
    email : zod.string().email(),//zod provides email checks 
    password : zod.string().min(8),
    country : zod.literal("IN").or(zod.literal("UN"))//literal means literally you want the thing specified
});

app.post("/health-checkup",(req,res)=>{
    // input is supposed to be an array 
    let kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if(response.success){
        let kidneyNUmber = kidneys.length;
        res.json({
            "number of kidneys" : kidneyNUmber
        })
    }else{
        res.status(411).json({
            msg : "invalid input"
        })
    }
})

//what if the user sends wrong input or there is an excption
//you have to use an error-handling-middleware or global catches
// app.use((err,req,res,next)=>{
//     res.json({
//         "msg" : "something is up with our server. sorry"
//     })
// })
app.listen(3000);