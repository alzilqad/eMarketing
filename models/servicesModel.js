const db = require('./db');

module.exports= {
	getByCompanyID: function(id, callback){
		var sql = "SELECT * FROM service WHERE company_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from service";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getServiceCount: function(callback){
		var sql = "SELECT COUNT(*) AS serviceCount FROM service;";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getActiveServiceCount: function(callback){
		var sql = "SELECT COUNT(*) AS serviceCount FROM service WHERE status ='Available'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(service, callback){
		var sql = "INSERT INTO `service`(`id`, `name`, `type`, `cost`, `status`, `company_id`) VALUES (0,'"+service.name+"','"+service.type+"','"+service.cost+"','"+service.status+"','"+service.company_id+"')";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(service, callback){
		var sql="UPDATE `service` SET `name`='"+service.name+"',`type`='"+service.type+"',`cost`='"+service.cost+"',`status`='"+service.status+"' WHERE id='"+service.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `service` WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}