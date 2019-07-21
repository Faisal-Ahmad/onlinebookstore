var db = require('./db');

module.exports = {
	create: function(user, callback){
        var sql = "INSERT INTO user (name, email, phone, password, admin) VALUES (?,?,?,?,?)";
		db.execute(sql,[user.name, user.email,user.phone,user.password,0], function(status){
			callback(status);
		});
	}
}