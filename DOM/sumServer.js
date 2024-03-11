const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specified methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specified headers
    next();
  });

app.get("/sum",(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    let sum = a+b;
    res.send(sum.toString());
});

app.listen(3000);