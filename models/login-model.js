var db = require('./db');

module.exports = {
	validate: function(user, callback){
		var sql = "select * from user where email=? and password=?";
		db.getResult(sql,[user.email, user.password], function(results){

			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	}
}