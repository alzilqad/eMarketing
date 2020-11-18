const express = require('express');
const managerModel = require.main.require('./models/managerModel');
const companyModel = require.main.require('./models/companyModel');
const clientModel = require.main.require('./models/clientModel');
const router = express.Router();
router.get('/', (req, res) => {
    if (req.session.email != null) {
        clientModel.getClientCount(function (clientsCount) {
            clientModel.getActiveClientCount(function (activeClientsCount) {
                res.render('manager/home/index', {
                    clientsCount: clientsCount,
                    activeClientsCount: activeClientsCount,
                    full_name : req.session.full_name
                });
            })
        });
    } else {
        res.render('manager/home/login');
    }
});
router.get('/company', function(req, res) {
    if(req.session.email==null){
        res.redirect('/manager/login');
    }
    else{
        if(req.session.email==null){
            res.redirect('/manager/login');
        }
        else{
            companyModel.getByManagerID(req.session.user_id, function (result){
                res.render('manager/company/index', {user: result, full_name:req.session.full_name});
            });
        }
    }
});
router.get('/company/edit/:id', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        companyModel.getByManagerID(req.session.user_id, function (result) {
            res.render('manager/company/edit', {
                user: result,
                full_name: req.session.full_name
            });
        });
    }
});
router.post('/company/edit/:id', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        company = {};
        company.id = req.params.id;
        company.name = req.body.company_name;
        company.address = req.body.address;
        company.phone = req.body.phone;
        company.type = req.body.type;

        companyModel.update(company, function (callback) {
            if (callback == true) {
                res.redirect('/manager/company');
            } else {
                res.redirect('/manager/company');
            }
        });
    }
});
router.get('/chat', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        res.render('manager/chat/index');
    }
});
router.get('/profile', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        managerModel.getByEmail(req.session.email, function (result) {
            req.session.user_id = result[0].id;
            req.session.full_name = result[0].full_name;
            res.render('manager/profile/index', {
                user: result,
                full_name: req.session.full_name
            });
        });
    }
});
router.get('/profile/edit/:id', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        managerModel.getByEmail(req.session.email, function (result) {
            req.session.full_name = result[0].full_name;
            res.render('manager/profile/edit', {
                user: result,
                full_name: req.session.full_name
            });
        });
    }
});
router.post('/profile/edit/:id', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        var sql = "UPDATE `manager` SET `full_name`='" + req.body.full_name + "',`phone`='" + req.body.phone + "',`dob`='" + req.body.date + "',`address`='" + req.body.address + "',`city`='" + req.body.city + "',`country`='" + req.body.country + "',`company_name`='" + req.body.company_name + "' WHERE id='" + req.params.id + "'";
        managerModel.update(sql, function (callback) {
            if (callback == true) {
                res.redirect('/manager/profile');
            } else {
                res.redirect('/manager/profile');
            }
        });
    }
});

router.get('/login', (req, res) => {
    req.session.destroy();
    res.render('manager/home/login');
});
router.post('/login', (req, res) => {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
    managerModel.validate(user, function (callback) {
        if (callback == true) {
            req.session.email = user.email;
            //req.session.user_id = user.id;
            req.session.full_name = user.full_name;
            res.redirect('/manager/profile');
        } else {
            res.redirect('/login');
        }
    });
});
router.get('/signup', (req, res) => {
    res.render('manager/home/sign-up');
});

router.post('/signup', (req, res) => {
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

    var company = {};
    company.name = req.body.company_name;

    managerModel.getByEmail(user.email, function (results) {
        if (results.length > 0) {
            res.redirect('/manager/signup');
        } else {
            managerModel.insert(user, function (status) {
                if (status == true) {
                    managerModel.getByEmail(user.email, function (result){ 
                        company.manager_id = result[0].id;
                        companyModel.insert(company, function (status) {
                            res.redirect('/manager/login');
                        });
                    });
                } else {
                    res.redirect('/manager/signup');
                }
            });
        }
    });
});
router.get('/forgot-password', (req, res) => {
    res.render('manager/home/forgot-password');
});
router.get('/verify-code', (req, res) => {
    res.render('manager/home/verify-code');
});
router.get('/reset-password', (req, res) => {
    res.render('manager/home/reset-password');
});
router.get('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/manager/login');
});
module.exports = router;