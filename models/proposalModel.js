const db = require('./db');

module.exports= {
	getById: function(id, callback){
		var sql = "SELECT * FROM proposal WHERE client_id='"+id+"'";
		console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getByProposalId: function(id, callback){
		var sql = "SELECT * FROM proposal WHERE id='"+id+"'";
		console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from proposal";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(proposal, callback){
		var sql = "INSERT INTO `proposal`(`id`, `title`, `subject`, `body`, `customer_name`, `starting_date`, `deadline_date`, `status`, `address`, `city`, `state`, `country`, `zip_code`, `email`, `phone`, `item`, `quantity`, `rate`, `client_id`, `manager_id`, `company_id`) VALUES (0,'"+proposal.title+"','"+proposal.subject+"','"+proposal.body+"','"+proposal.customer_name+"','"+proposal.starting_date+"','"+proposal.deadline_date+"','"+proposal.status+"','"+proposal.address+"','"+proposal.city+"','"+proposal.state+"','"+proposal.country+"','"+proposal.zip_code+"','"+proposal.email+"','"+proposal.phone+"','"+proposal.item+"','"+proposal.quantity+"','"+proposal.rate+"','"+proposal.client_id+"','"+proposal.manager_id+"','"+proposal.company_id+"')";

		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(proposal, callback){
		var sql="UPDATE `proposal` SET `title`='"+proposal.title+"',`subject`='"+proposal.subject+"',`body`='"+proposal.body+"',`customer_name`='"+proposal.customer_name+"',`starting_date`='"+proposal.starting_date+"',`deadline_date`='"+proposal.deadline_date+"',`status`='"+proposal.status+"',`address`='"+proposal.address+"',`city`='"+proposal.city+"',`state`='"+proposal.state+"',`country`='"+proposal.country+"',`zip_code`='"+proposal.zip_code+"',`email`='"+proposal.email+"',`phone`='"+proposal.phone+"',`item`='"+proposal.item+"',`quantity`='"+proposal.quantity+"',`rate`='"+proposal.rate+"' WHERE client_id='"+proposal.client_id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `proposal` WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}