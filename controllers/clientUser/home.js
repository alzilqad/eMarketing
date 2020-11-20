const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('clientUser/home/index', {name: req.cookies['uname'], type: req.cookies['type']});	
});

module.exports = router;