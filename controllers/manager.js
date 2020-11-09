const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
    res.render('manager/home/index');
});
router.get('/chat', (req, res)=>{
    res.render('manager/chat/index');
});
router.get('/profile', (req, res)=>{
    res.render('manager/profile/index');
});
router.get('/profile/edit/:id', (req, res)=>{
    res.render('manager/profile/edit');
});
router.get('/login', (req, res)=>{
    res.render('manager/home/login');
});
module.exports = router;