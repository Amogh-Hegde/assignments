const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:practice%20@cluster0.7xrssdb.mongodb.net/business-card-app")

const cardSchema = mongoose.Schema({
    name : String,
    description : String,
    interests : String,
    links : [String]
});

const card = mongoose.model('cards',cardSchema);

module.exports = {
    card
}