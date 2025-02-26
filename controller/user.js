const User = require('../model/user');
const { v4: uuidv4} = require('uuid');
const { createSessionId} = require('../services/auth');

// Handle user signup
async function handleUserSignup(req,res){
    const {name, email, password} = req.body;
    await User.create(
        {
            name,
            email,
            password
        
        });
return  res.redirect('/');

}

// Handle user login
async function handleUserLogin(req,res){
    const { email, password} = req.body;
    const user= await User.findOne({  email, password});
    if(!user){
       return res.render ('login', {error: 'Invalid credentials'});
    }

const token = createSessionId( user);
  res.cookie('token', token);
return     res.redirect("/");

}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}