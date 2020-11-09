const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
    res.render('manager/clients/index');
});
router.get('/profile/:id', (req, res)=>{
    res.render('manager/clients/profile');
});
router.get('/profile/:id/calls', (req, res)=>{
    res.render('manager/clients/calls');
});
router.get('/profile/:id/appointments', (req, res)=>{
    res.render('manager/clients/appointments');
});
router.get('/profile/:id/notes', (req, res)=>{
    res.render('manager/clients/notes');
});
router.get('/profile/:id/proposals', (req, res)=>{
    res.render('manager/clients/proposals');
});
router.get('/profile/:id/chat', (req, res)=>{
    res.render('manager/clients/chat');
});
module.exports = router;