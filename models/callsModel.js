const db = require('./db');

module.exports= {
	getById: function(id, callback){
		var sql = "SELECT * FROM calls WHERE client_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from calls";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(calls, callback){
		var sql = "INSERT INTO `calls`(`id`, `title`, `description`, `date`, `client_id`, `manager_id`) VALUES (0,'"+calls.title+"','"+calls.description+"','"+calls.date+"','"+calls.client_id+"','"+calls.manager_id+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(calls, callback){
		var sql="UPDATE `calls` SET `title`='"+calls.title+"',`description`='"+calls.description+"',`date`='"+calls.date+"',`client_id`='"+calls.client_id+"',`manager_id`='"+calls.manager_id+"' WHERE client_id='"+calls.client_id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `calls` WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}