const express = require('express');
const managerModel		= require.main.require('./models/managerModel');
const router = express.Router();
router.get('/', (req, res)=>{
    if(req.session.email==null || req.session.email.length<2){
        res.redirect('/manager/login');
    }   
    else{
        res.render('manager/home/index');
    }
});
router.get('/chat', (req, res)=>{
    if(req.session.email==null || req.session.email.length<2){
        res.redirect('/manager/login');
    }
    else{
        res.render('manager/chat/index');
    }
});
router.get('/profile', (req, res)=>{
    if(req.session.email==null || req.session.email.length<2){
        res.redirect('/manager/login');
    }
    else{
        res.render('manager/profile/index');
    }
});
router.get('/profile/edit/:id', (req, res)=>{
    if(req.session.email==null || req.session.email.length<2){
        res.redirect('/manager/login');
    }
    else{
        res.render('manager/profile/edit');
    }
});
router.get('/login', (req, res)=>{
    res.render('manager/home/login');
});
router.post('/login', (req, res)=>{
    var user = {
        email: req.body.email,
        password: req.body.password
    };
    managerModel.validate(user, function(callback) {
        if(callback==true){
            req.session.email = user.email;
            res.redirect('/manager/profile');
        }
        else{
            res.redirect('/login');
        }
    });
});
router.get('/signup', (req, res)=>{
    res.render('manager/home/sign-up');
});

router.post('/signup',(req, res) => {
    var user = {};
    user.full_name = req.body.full_name;
    user.user_name = req.body.user_name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.dob = req.body.dob;
    user.address = req.body.address;
    user.city = req.body.city;
    user.country = req.body.country;
    user.company_name = req.body.company_name;
    user.password = req.body.password;
    user.re_enter_password = req.body.re_enter_password;
    user.status = 0;
    user.joining_date = Date.now();

    managerModel.getByUserName(user.user_name,function(results){
        if(results.length>0){
            res.redirect('/manager/signup');
        }
        else{
            managerModel.insert(user, function(status){
                if(status==true){
                    res.redirect('/manager/login');
                }
                else{
                    res.redirect('/manager/signup');
                }
            });
        }
    });
});
router.get('/forgot-password', (req, res)=>{
    res.render('manager/home/forgot-password');
});
router.get('/verify-code', (req, res)=>{
    res.render('manager/home/verify-code');
});
router.get('/reset-password', (req, res)=>{
    res.render('manager/home/reset-password');
});
router.get('/signout', (req, res)=>{
    req.session.destroy();
    res.redirect('/manager/login');
});
module.exports = router;