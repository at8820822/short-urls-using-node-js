const express= require('express');
const router = express.Router();
const URL= require('../model/url');
const { restrictTO } = require('../middlewares/auth');



router.get('/admin/urls', restrictTO(['ADMIN']), async(req,res)=>{
    const allurls= await  URL.find({});
    res.render('admin', {
        urls : allurls,
    });
});

router.get('/', restrictTO(['NORMAL','ADMIN']), async(req,res)=>{
  
   const allurls= await  URL.find({createdBy:req.user._id});
    res.render('home', {
        urls : allurls,
    });
});

router.get('/signup', (req,res)=>{
    res.render('signup');
});
router.get('/login', (req,res)=>{
    res.render('login');
});
module.exports = router;