const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
    res.render('manager/clients/index');
});
router.get('/profile', (req, res)=>{
    res.render('manager/clients/profile');
});
module.exports = router;