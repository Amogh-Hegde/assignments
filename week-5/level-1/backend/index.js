const express = require('express');
const app = express();
const {createCard} = require('./types')
const {card} = require ('./db')
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.post("/cards",async (req,res) => {
    const cardPayload = req.body;
    const parsedPayload = createCard.safeParse(cardPayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg : "wrong input"
        });
    }
    await card.create({
        name : cardPayload.name,
        description : cardPayload.description,
        interests : cardPayload.interests,
        links : cardPayload.links
    });
    res.json({
        msg : "card created!"
    });
})

app.get("/cards",async (req,res) => {
    const allCards = await card.find();
    return res.json({
        "cards" : allCards
    });
})

app.listen(3000,() => console.log("server running on port 3000"));