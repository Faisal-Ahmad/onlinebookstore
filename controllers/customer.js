var express = require('express');
var customer = require.main.require('./models/customer-model');
var router = express.Router();

router.get('*', function(req, res, next){

	if(req.session.userid != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	customer.getAllBook(function(results){
	if(results != null){
		res.render('customer/index', {booklist: results});			
	}else{
		res.send('Error!.. try again...');
	}
});
});
router.get('/profile', function(req, res){

	customer.getById(req.session.userid, function(result){
			res.render('customer/profile', {user: result[0]});			
		
	});
});

router.post('/profile', function(req, res){
	
	var data = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		id:req.session.userid
	};

	customer.update(data, function(status){
		if(status){
			res.redirect('/customer/profile');			
		}else{
			res.send('Server Problem ...');
		}
	});
});
router.get('/viewbook/:id', function(req, res){
	customer.getBookById(req.params.id, function(result){
		res.render('customer/viewbook', {book: result[0]});			
		
	});
});
router.get('/cart/:id', function(req, res){
	customer.getBookById(req.params.id, function(result){
		var bookcart = req.session.books;
		var book ={
			id:result[0].id,
			name:result[0].name,
			price:result[0].price
		}
		var exist =0;
		var count = req.session.books.length;
		if(count==0)
		{
			bookcart.push(book);
			req.session.books=bookcart;
		}
		else{
		for(var i = 0;i<count;i++)
		{
			if(req.session.books[i].name==book.name)
			{
				exist=1;
			}
		}
		if(exist==0)
		{
			
			bookcart.push(book);
			req.session.books=bookcart;
		}
		}
		
		res.redirect('/customer');				
	});
});
router.get('/mycart', function(req, res){
	res.render('customer/mycart',{cartlist: req.session.books});			
});
router.get('/remove/:id', function(req, res){
	var count = req.session.books.length;
	for(var i=0;i<count;i++)
	{
		if(req.session.books[i].id == req.param.id)
		{
			
		}
	}
	
	res.redirect('/customer/mycart');			
});
router.get('/buy/:id', function(req, res){
	var data = {
        bookid: req.param.id,
        userid: req.session.id
	};
	 customer.buybook(data, function(status){
		if(status){
			res.redirect('/customer/mycart');
		}else{
			res.send('Server Problem....');
		}
	});		
});
module.exports = router;