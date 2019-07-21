var db = require('./db');

module.exports = {
	getById: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResult(sql, [id], function(result){
			console.log(result.length);
			callback(result);
		});
	},
	update: function(user, callback){
		var sql = "update user set name=?, email=?,phone=? where id=?";
		db.execute(sql, [user.name, user.email,user.phone, user.id], function(status){
			callback(status);
		});
	},
	getAllBook: function(callback){
		var sql = "select * from book where sold = 0";
		db.getResult(sql, [], function(results){
			callback(results);
		});	
	},
	getBookById: function(id, callback){
		var sql = "select * from book where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	buybook: function(data, callback){
		var sql = "INSERT INTO sell (bookId, userId, date) VALUES (?,?,?,?,?)";
		var date = new Date().toString();
		db.execute(sql,[data.bookid, data.userid,date], function(status){
			callback(status);
		});
	}
	
}