const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require("zod");
const usernameSchema = zod.string().email();
const passwordSchema = zod.string().min(6);


function signJwt(username, password) {
    const usernameResponse = usernameSchema.safeParse(username) ;
    const passwordResponse = passwordSchema.safeParse(password);
    if(usernameResponse.success && passwordResponse.success){
        let token = jwt.sign({username: username},jwtPassword);
        return token;
    }else{
        return null;
    }
}


function verifyJwt(token) {
    try{
        jwt.verify(token,jwtPassword);
        return true;
    }catch{
        return false;
    }
}


function decodeJwt(token) {
   let canDecode = jwt.decode(token);
   if(canDecode){
    return true;
   }else{
    return false;
   }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
