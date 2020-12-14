const db = require('./db');

module.exports= {
	getById: function(id, callback){
		var sql = "SELECT * FROM note WHERE client_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from note";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
        var sql = "INSERT INTO `note`(`id`, `title`, `body`, `manager_id`, `client_id`, `creation_date`) VALUES (0,'"+user.title+"','"+user.body+"','"+user.manager_id+"','"+user.client_id+"','"+user.creation_date+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(note, callback){
		var sql="UPDATE `note` SET `title`='"+note.title+"',`body`='"+note.body+"',`manager_id`='"+note.manager_id+"',`client_id`='"+note.client_id+"',`creation_date`='"+note.date+"' WHERE id='"+note.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `note` WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}