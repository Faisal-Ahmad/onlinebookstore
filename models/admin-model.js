var db = require('./db');

module.exports = {
	getById: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	update: function(user, callback){
		var sql = "update user set name=?, email=?,phone=? where id=?";
		db.execute(sql, [user.name, user.email,user.phone, user.id], function(status){
			callback(status);
		});
	},
	create: function(user, callback){
        var sql = "INSERT INTO user (name, email, phone, password, admin) VALUES (?,?,?,?,?)";
		db.execute(sql,[user.name, user.email,user.phone,user.password,1], function(status){
			callback(status);
		});
	},
	getAllAdmin: function(id,callback){
		var sql = "select * from user where admin = ? and id !=?";
		db.getResult(sql, [1,id], function(results){
			callback(results);
		});	
	},
	getAllCustomer: function(callback){
		var sql = "select * from user  where admin = 0";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	deleteCustomer: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	addBook: function(book, callback){
        var sql = "INSERT INTO book (name, author, category, price, description,sold) VALUES (?,?,?,?,?,?)";
		db.execute(sql,[book.name, book.author,book.category,book.price,book.description,false], function(status){
			callback(status);
		});
	}
	
}