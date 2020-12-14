const db = require('./db');

module.exports= {
	getByManagerID: function(id, callback){
		var sql = "SELECT * FROM company WHERE manager_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from company";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(company, callback){
        var sql = "INSERT INTO `company`(`id`, `company_name`, `company_address`, `contact_number`, `type`, `manager_id`) VALUES (0,'"+company.name+"','','','','"+company.manager_id+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(company, callback){
		var sql="UPDATE `company` SET `company_name`='"+company.name+"',`company_address`='"+company.address+"',`contact_number`='"+company.phone+"',`type`='"+company.type+"' WHERE id='"+company.id+"'";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `company` WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}