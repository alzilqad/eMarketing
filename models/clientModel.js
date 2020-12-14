const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "SELECT * FROM `clients` WHERE email='"+user.email+"' AND password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByEmail: function(email, callback){
		var sql = "SELECT * FROM `clients` WHERE email='"+email+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById: function(id, callback){
		var sql = "select * from clients where id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from clients";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getClientCount: function(callback){
		var sql = "SELECT COUNT(*) AS clientsCount FROM clients;";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getActiveClientCount: function(callback){
		var sql = "SELECT COUNT(*) AS activeClientsCount FROM clients WHERE status = 'Active';";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
        var sql = "INSERT INTO `clients`(`id`, `full_name`, `email`, `phone`, `address`, `city`, `country`, `website`, `added_by`, `adding_date`, `status`, `password`, `billing_city`, `billing_state`, `billing_country`, `billing_zip`) VALUES (0,'"+user.full_name+"','"+user.email+"','"+user.phone+"','"+user.address+"','"+user.city+"','"+user.country+"','"+user.website+"','"+user.added_by+"','"+user.adding_date+"','"+user.status+"','"+user.password+"','"+user.billing_city+"','"+user.billing_state+"','"+user.billing_country+"','"+user.billing_zip+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(sql, callback){
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `clients` WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getByText: function(text, callback){
		var sql = "SELECT * FROM `clients` WHERE full_name LIKE '%"+text+"%' LIMIT 2";
		db.getResults(sql, function(results){
			callback(results);
		});
	}
}