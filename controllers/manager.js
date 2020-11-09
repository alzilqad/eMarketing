const express = require('express');
const router = express.Router();
router.get('/', (req, res)=>{
    res.render('manager/home/index');
});
module.exports = router;