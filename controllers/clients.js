const express = require('express');
const clientModel = require.main.require('./models/clientModel');
const router = express.Router();
router.get('/', (req, res) => {
    if (req.session.email == null || req.session.email.length < 2) {
        res.redirect('/manager/login');
    } else {
        clientModel.getAll(function (result) {
            res.render('manager/clients/index', {
                users: result
            });
        });
    }
});
router.post('/add', (req, res)=>{
    var client = {};
    client.full_name = req.body.full_name;
    client.email = req.body.email;
    client.phone = req.body.phone;
    client.address = req.body.address;
    client.city = req.body.city;
    client.country = req.body.country;
    client.website = req.body.website;
    client.billing_city = req.body.billing_city;
    client.billing_state = req.body.billing_state;
    client.billing_zip = req.body.billing_zip;
    client.billing_country = req.body.billing_country;
    client.password = req.body.password;
    client.added_by  = req.session.email;
    client.adding_date = Date.now();
    client.status = 0;

    clientModel.getByEmail(client.email, function(result) {
        if(result.length>0){
            console.log("hello");
            res.redirect('/clients');
        }
        else{
            clientModel.insert(client, function(status){
                if(status==true){
                    clientModel.getByEmail(client.email, function(result){
                        res.redirect('/clients/profile/:'+result[0].id+'');
                    })
                }
                else{
                    res.redirect('/clients')
                }
            });
        }
    });
});
router.get('/profile/:id', (req, res) => {
    clientModel.getById(req.params.id, function(result){
        if(result.length>0){
            res.render('manager/clients/profile', {user:result});
        }
        else{
            res.redirect('/clients');
        }
    });
});
router.get('/profile/:id/calls', (req, res) => {
    res.render('manager/clients/calls');
});
router.get('/profile/:id/appointments', (req, res) => {
    res.render('manager/clients/appointments');
});
router.get('/profile/:id/notes', (req, res) => {
    res.render('manager/clients/notes');
});
router.get('/profile/:id/proposals', (req, res) => {
    res.render('manager/clients/proposals');
});
router.get('/profile/:id/chat', (req, res) => {
    res.render('manager/clients/chat');
});
module.exports = router;