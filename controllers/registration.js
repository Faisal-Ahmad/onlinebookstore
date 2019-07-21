var express = require('express');
var registration	= require.main.require('./models/registration-model');
var router = express.Router();

router.get('/',function(req,res){
	res.render('registration/index');
});

router.post('/', function(req, res){
	
	var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
		password: req.body.password,
	};

	registration.create(data, function(status){
		if(status){
			res.redirect('/customer');
		}else{
			res.send('Server Problem....');
		}
	});

});

module.exports = router;