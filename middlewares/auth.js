const {getuser} = require('../services/auth');


function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;

   req.user = null;

    if (!tokenCookie) {
        
        return next();
    }

    const token = tokenCookie;
    const user = getuser(token);

        req.user = user;
    

    next();


}


function restrictTO(roles = []) {
    return function (req, res, next) {


        if (!req.user) return res.redirect('/login');
        

        if (!roles.includes(req.user.role))  return res.end('You are not allowed to access this page');


        return next();
    };
}


module.exports = {
    checkForAuthentication,
    restrictTO,
};