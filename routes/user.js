const express = require('express');
const router = express.Router();
const {handleUserSignup} = require('../controller/user');
const {handleUserLogin}=require('../controller/user');


//routes user
router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);
module.exports = router;