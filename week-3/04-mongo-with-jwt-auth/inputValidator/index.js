const zod = require("zod");


const usernameSchema = zod.string();
const passwordSchema = zod.string().min(8).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/);



module.exports = {
    usernameSchema,
    passwordSchema
};
