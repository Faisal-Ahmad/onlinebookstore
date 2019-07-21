var express = require('express');
var admin = require.main.require('./models/admin-model');
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.session.userid != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){

	admin.getById(req.session.userid, function(result){
			res.render('admin/index');			
		
	});
});
router.get('/profile', function(req, res){

	admin.getById(req.session.userid, function(result){
			res.render('admin/profile', {user: result[0]});			
		
	});
});

router.post('/profile', function(req, res){
	
	var data = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		id:req.session.userid
	};

	admin.update(data, function(status){

		if(status){
			res.render('admin');			
		}else{
			res.send('Server Problem ...');
		}
	});
});
router.get('/addadmin', function(req, res){

	admin.getById(req.session.userid, function(result){
			res.render('admin/addadmin');			
		
	});
});

router.post('/addadmin', function(req, res){
	
	var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
		password: req.body.password,
	};

	admin.create(data, function(status){
		if(status){
			res.render('admin');
		}else{
			res.send('Server Problem....');
		}
	});

});
router.get('/view_admin', function(req, res){
	admin.getAllAdmin(req.session.userid,function(results){
	if(results != null){
		res.render('admin/view_admin', {adminlist: results});			
	}else{
		res.send('Error!.. try again...');
	}
});
});
router.get('/view_customer', function(req, res){
	admin.getAllCustomer(function(results){
	if(results != null){
		res.render('admin/view_customer', {customerlist: results});			
	}else{
		res.send('Error!.. try again...');
	}
});
});
router.get('/delete/:id', function(req, res){

	admin.deleteCustomer(req.params.id, function(status){
		if(status){
			res.render('admin');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.get('/addbook', function(req, res){
		res.render('admin/addbook');			
});
router.post('/addbook', function(req, res){
	
	var data = {
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
		price: req.body.price,
		description:req.body.description
	};

	admin.addBook(data, function(status){
		if(status){
			res.render('admin');
		}else{
			res.send('Server Problem....');
		}
	});

});
module.exports = router;