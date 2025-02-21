const jwt = require('jsonwebtoken');

const secret = "mysecret@123@";
// Create a new session id and store the user in the map




function createSessionId( user) {


    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);

}
// Get the user from the map using the session id
function getuser(token){
    if(!token){
        return null;
    
    }
    try{
        // verify the token sent by the user  and secret key used to sign the token
        return jwt.verify(token, secret);}
    catch(e){
        return null;
    }
 
}


module.exports = { 

createSessionId,
getuser,
 }