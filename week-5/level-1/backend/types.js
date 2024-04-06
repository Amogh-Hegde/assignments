const zod = require("zod");

const createCard = zod.object({
    name : zod.string(),
    description : zod.string(),
    interests : zod.string(),
    links : zod.array(zod.string()),
});

module.exports = {
    createCard,
}