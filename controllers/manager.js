const express = require('express');
const managerModel = require.main.require('./models/managerModel');
const companyModel = require.main.require('./models/companyModel');
const clientModel = require.main.require('./models/clientModel');
const servicesModel = require.main.require('./models/servicesModel');
const nodemailer = require('nodemailer');
const router = express.Router();
router.get('/', (req, res) => {
    if (req.session.email != null) {
        clientModel.getClientCount(function (clientsCount) {
            clientModel.getActiveClientCount(function (activeClientsCount) {
                servicesModel.getServiceCount(function (servicesCount) {
                    servicesModel.getActiveServiceCount(function (activeServicesCount) {
                        res.render('manager/home/index', {
                            clientsCount: clientsCount,
                            activeClientsCount: activeClientsCount,
                            full_name: req.session.full_name,
                            servicesCount: servicesCount,
                            activeServicesCount: activeServicesCount
                        });
                    });
                });
            })
        });
    } else {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    }
});
router.get('/company', function (req, res) {
    if (req.session.email == null) {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    } else {
        if (req.session.email == null) {
            req.session.error = [{msg: "Please login first!"}];
            res.redirect('/manager/login');
        } else {
            companyModel.getByManagerID(req.session.user_id, function (result) {
                res.render('manager/company/index', {
                    user: result,
                    full_name: req.session.full_name
                });
            });
        }
    }
});
router.get('/company/edit/:id', (req, res) => {
    var error = null;
    var msg = null;
    if (req.session.error != null) {
        error = req.session.error;
        console.log(error[0].msg);
    }
    req.session.error = null;

    if (req.session.email == null || req.session.email.length < 2) {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    } else {
        companyModel.getByManagerID(req.session.user_id, function (result) {
            req.session.error = null;
            res.render('manager/company/edit', {
                user: result,
                full_name: req.session.full_name,
                error: error
            });
        });
    }
});
router.post('/company/edit/:id', (req, res) => {
    req.check('phone', 'Invalid Phone Number').isInt().withMessage('Phone Number should be numeric only!').isLength({ min:11}).withMessage('Phone number should be at least 11 characters long!');
    req.check('address', 'Invalid address!').isLength({ min: 3}).withMessage('Address should be at least 3 characters long!');
    req.check('company_name', 'Invalid Company Name!').isLength({ min: 3}).withMessage('Company Name should be at least 3 characters long!');

    var error = req.validationErrors();
    if (error) {
        req.session.error = error;
    } else {
        req.session.success = 'Registration Succsessfull!';
    }
    if(req.session.error==null){
        if (req.session.email == null || req.session.email.length < 2) {
            req.session.error = [{msg: "Please login first!"}];
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
    }
    else{
        res.redirect('/manager/company/edit/'+req.params.id);
    }
});
router.get('/chat', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    } else {
        res.render('manager/chat/index', {
            full_name: req.session.full_name
        });
    }
});
router.get('/profile', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        req.session.error = [{msg: "Please login first!"}];
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
    var error = null;
    var msg = null;
    if (req.session.error != null) {
        error = req.session.error;
        console.log(error[0].msg);
    }

    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        managerModel.getByEmail(req.session.email, function (result) {
            req.session.full_name = result[0].full_name;
            res.render('manager/profile/edit', {
                user: result,
                full_name: req.session.full_name,
                error: error
            });
        });
    }
});
router.post('/profile/edit/:id', (req, res) => {
    req.check('full_name').not().isEmpty().withMessage('Full Name should be minimum 5 characters long!')
    req.check('phone', 'Invalid Phone Number').isInt().withMessage('Phone Number should be numeric only!').isLength({ min:11}).withMessage('Phone number should be at least 11 characters long!');
    req.check('address', 'Invalid address!').isLength({ min: 3}).withMessage('Address should be at least 3 characters long!');
    req.check('city', 'Invalid city!').isLength({ min: 3}).withMessage('City should be at least 3 characters long!');
    req.check('country', 'Invalid country!').isLength({ min: 3}).withMessage('Country should be at least 3 characters long!');
    req.check('company_name', 'Invalid Company Name!').isLength({ min: 3}).withMessage('Company Name should be at least 3 characters long!');
    var error = req.validationErrors();
    if (error) {
        req.session.error = error;
    } else {
        req.session.success = 'Registration Succsessfull!';
    }
    if(req.session.error==null){
        if (req.session.email == null || req.session.email.length < 2) {
            req.session.error = [{msg: "Please login first!"}];
            res.redirect('/manager/login');
        } else {
            var sql = "UPDATE `manager` SET `full_name`='" + req.body.full_name + "',`phone`='" + req.body.phone + "',`dob`='" + req.body.date + "',`address`='" + req.body.address + "',`city`='" + req.body.city + "',`country`='" + req.body.country + "',`company_name`='" + req.body.company_name + "' WHERE id='" + req.params.id + "'";
            managerModel.update(sql, function (callback) {
                if (callback == true) {
                    res.redirect('/manager/profile');
                } else {
                    req.session.error = 'Could not update user profile!';
                    res.redirect('/manager/profile/edit/'+req.params.id);
                }
            });
        }
    }
    else{
        res.redirect('/manager/profile/edit/'+req.params.id);
    }
});

router.get('/login', (req, res) => {
    var error = null;
    var msg = null;
    if (req.session.error != null) {
        error = req.session.error;
        console.log(error)
        console.log(error[0].msg);
    }
    req.session.destroy();

    res.render('manager/home/login', {
        error: error
    });
});
router.post('/login', (req, res) => {
    req.check('email', 'Invalid Email Addrress!').isEmail();
    req.check('password', 'Invalid Password!').isLength({
        min: 3
    }).withMessage('Password must be at least 3 characters!');
    var error = req.validationErrors();
    if (error) {
        req.session.error = error;
        console.log('fail');
    } else {
        console.log('scuccess');
        req.session.success = "Login Successfull!";
    }

    if (req.session.error != null) {
        res.redirect('/manager/login');
    } else {
        var user = {
            email: req.body.email,
            password: req.body.password
        };
        if (req.session.error == null) {
            managerModel.validate(user, function (callback) {
                if (callback == true) {
                    managerModel.getByEmail(user.email, function (result) {
                        user.id = result[0].id;
                        user.full_name = result[0].full_name;
                        user.type = result[0].type;

                        req.session.email = user.email;
                        req.session.user_id = user.id;
                        req.session.full_name = user.full_name;

                        console.log(req.session.user_id);

                        companyModel.getByManagerID(user.id, function (result) {
                            req.session.com_id = result[0].id;
                            res.redirect('/manager/profile');
                        });

                    });
                } else {
                    req.session.error = [{
                        msg: 'Invalid email or password!'
                    }];
                    res.redirect('/manager/login');
                }
            });
        } else {
            res.redirect('/manager/login');
        }
    }
});
router.get('/signup', (req, res) => {
    var error = null;
    var msg = null;
    if (req.session.error != null) {
        error = req.session.error;
        console.log(error[0].msg);
    }
    req.session.destroy();
    res.render('manager/home/sign-up', {
        error: error
    });
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
    var timeElapsed = Date.now();
    var today = new Date(timeElapsed);
    today = today.toLocaleDateString();
    user.joining_date = toda;

    var company = {};
    company.name = req.body.company_name;

    req.check('full_name').not().isEmpty().withMessage('Full Name should be minimum 5 characters long!');
    req.check('email', 'Invalid email address').isEmail().not().isEmpty();
    req.check('phone', 'Invalid Phone Number').isInt().withMessage('Phone Number should be numeric only!').isLength({ min:11}).withMessage('Phone number should be at least 11 characters long!');
    req.check('address', 'Invalid address!').isLength({ min: 3}).withMessage('Address should be at least 3 characters long!');
    req.check('city', 'Invalid city!').isLength({ min: 3}).withMessage('City should be at least 3 characters long!');
    req.check('country', 'Invalid country!').isLength({ min: 3}).withMessage('Country should be at least 3 characters long!');
    req.check('company_name', 'Invalid Company Name!').isLength({ min: 3}).withMessage('Company Name should be at least 3 characters long!');
    req.check('password', 'Invalid Password!').isLength({min: 8}).withMessage('Password should be at least 8 characters long!');
    req.check('re_enter_password', 'Invalid Confirm Password!').isLength({min: 8}).withMessage('Confirm password should be at least 8 characters long!');
    var error = req.validationErrors();
    if (error) {
        req.session.error = error;
    } else {
        req.session.success = 'Registration Succsessfull!';
    }

    if(req.session.error==null){
        managerModel.getByEmail(user.email, function (results) {
            if (results.length > 0) {
                req.session.error = [{msg: 'Email address is already registered!'}];
                res.redirect('/manager/signup');
            } else {
                managerModel.insert(user, function (status) {
                    if (status == true) {
                        managerModel.getByEmail(user.email, function (result) {
                            company.manager_id = result[0].id;
                            companyModel.insert(company, function (status) {
                                res.redirect('/manager/login');
                            });
                        });
                    } else {
                        req.session.success = [{msg: 'Registration Succsessfull!'}];
                        res.redirect('/manager/login');
                    }
                });
            }
        });
    }
    else{
        res.redirect('/manager/signup');
    }
});
router.get('/forgot-password', (req, res) => {
    var error = req.session.error;
    req.session.error = null;
    req.session.destroy();
    res.render('manager/home/forgot-password', {error:error});
});
router.post('/forgot-password', (req, res) => {
    managerModel.getByEmail(req.body.email, function (result) {
        if (result.length > 0) {
            req.session.user_id = result[0].id;
            req.session.user_name = result[0].full_name;
            req.session.password = result[0].password;
            req.session.user_mail = result[0].email;
            res.redirect('/manager/send-mail');
            //res.redirect('/manager/verify-code');
        } else {
            res.redirect('/manager/forgot-password');
        }
    });
});
router.get('/verify-code', (req, res) => {
    var error = req.session.error;
    req.session.error = null;
    if (req.session.verification_code == null || req.session.user_mail == null) {
        res.redirect('/manager/forgot-password');
    } else {
        res.render('manager/home/verify-code', {
            user_name: req.session.user_name,
            user_id: req.session.user_id,
            error: error
        });
    }
});
router.post('/verify-code', function (req, res) {
    if (req.session.verification_code == null || req.session.user_mail == null) {
        res.redirect('/manager/forgot-password');
    } else {
        if (req.session.verification_code == req.body.verification_code) {
            res.redirect('/manager/reset-password');
        } else {
            req.session.error = [{msg: "Invalid Verification Code!"}];
            res.redirect('/manager/forgot-password');
        }
    }
});
router.get('/reset-password', (req, res) => {
    var error = req.session.error;
    req.session.error = null;
    if (req.session.user_mail == null || req.session.verification_code == null) {
        res.redirect('/manager/forgot-password');
    } else {
        res.render('manager/home/reset-password',{error: error});
    }
});
router.post('/reset-password', function (req, res) {
    if (req.session.user_mail == null || req.session.verification_code == null) {
        res.redirect('/manager/forgot-password');
    } else {
        if (req.body.password == req.body.confirm_password) {
            var sql = "UPDATE manager SET password='" + req.body.password + "' WHERE id='" + req.session.user_id + "'";
            managerModel.update(sql, function (callback) {
                if (callback == true) {
                    req.session.destroy();
                    res.redirect('/manager/login');
                } else {
                    res.send('Could not reset password!');
                }
            });
        } else {
            res.send('Invalid Password!');
        }
    }
});
router.get('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/manager/login');
});
router.get('/company/services', (req, res) => {
    if (req.session.email != null) {
        servicesModel.getByCompanyID(req.session.com_id, function (result) {
            res.render('manager/company/services', {
                full_name: req.session.full_name,
                user: result
            });
        });
    } else {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    }
});
router.post('/company/services/add', (req, res) => {
    if (req.session.email != null) {
        var service = {};
        service.company_id = req.session.com_id;
        service.name = req.body.name;
        service.type = req.body.type;
        service.cost = req.body.cost;
        service.status = req.body.status;
        servicesModel.insert(service, function (status) {
            if (status == true) {
                res.redirect('/manager/company/services');
            } else {
                res.redirect('/manager/company/services');
            }
        });
    } else {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    }
})
router.get('/company/services/delete/:id', function (req, res) {
    if (req.session.email == null) {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    } else {
        servicesModel.delete(req.params.id, function (status) {
            if (status == true) {
                res.redirect('/manager/company/services');
            } else {
                res.redirect('/manager/company/services');
            }
        });
    }
});
router.post('/company/services/edit/:id', (req, res) => {
    if (req.session.email == null) {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    } else {
        var service = {};
        service.name = req.body.name;
        service.type = req.body.type;
        service.cost = req.body.cost;
        service.status = req.body.status
        service.id = req.params.id;
        servicesModel.update(service, function (callback) {
            if (callback == true) {
                res.redirect('/manager/company/services');
            } else {
                res.redirect('/manager/company/services');
                res.redirect('/manager/company/services');
            }
        });
    }
});
router.get('/send-mail', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shohag.cse45@gmail.com',
            pass: 'cinecarnival'
        }
    });

    var verification_code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    req.session.verification_code = verification_code;
    var mailOptions = {
        from: 'shohag.cse45@gmail.com',
        to: req.session.user_mail,
        subject: 'Password Reset',
        text: 'To reset your password please enter the following code in the field: ' + verification_code
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            //console.log(err);
        } else {
            //console.log('Mail has been sent!'+ info.response);
        }
    });
    res.redirect('/manager/verify-code');
});
router.get('/service/report', function (req, res) {
    if (req.session.email == null) {
        req.session.error = [{msg: "Please login first!"}];
        res.redirect('/manager/login');
    } else {
        var timeElapsed = Date.now();
        var today = new Date(timeElapsed);
        today = today.toLocaleDateString();
        servicesModel.getReportData(function (result) {
            res.render('manager/clients/service-report', {
                users: result,
                full_name: req.session.full_name,
                date: today
            });
        });
    }
});
router.post('/uploads/:name', function (req, res){
    if(req.files){
        var file = req.files.file;
        file.name = req.params.name+'.jpg';
        var filename = file.name;
        file.mv('./assets/img/uploads/'+filename, function(error){
            if(error){
                console.log(error);
            }
            else{
                res.redirect('/manager/profile');
            }
        });
    }
});
module.exports = router;