var express = require('express');
var login	= require.main.require('./models/login-model');
var router = express.Router();

router.get('/',function(req,res){
	res.render('login/index');
});

router.post('/', function(req, res){
	
	var data = {
		email: req.body.email,
		password: req.body.password,
	};

	login.validate(data, function(result){
		if(result!=null){
			req.session.userid = result[0].id;
			req.session.books = [];
			// var product = req.session.product
			// product.push(newProduct)
			// req.session.product = product
			// SELECT * FROM PRODUCTS WHERE NAME LIKE %S%
			if(result[0].admin==true)
			{
				
			res.redirect('/admin');
			}
			else
			{
			res.redirect('/customer');
			}
		}else{
			res.send('invalid username/password...');
		}
	});

});
module.exports = router;