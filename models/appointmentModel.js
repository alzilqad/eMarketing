const db = require('./db');

module.exports= {
	getById: function(id, callback){
		var sql = "SELECT * FROM appointment WHERE clients_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from appointment";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(appointment, callback){
		var sql = "INSERT INTO `appointment`(`id`, `title`, `body`, `creation_date`, `appointment_date`, `manger_id`, `clients_id`) VALUES (0,'"+appointment.title+"','"+appointment.body+"','"+appointment.creation_date+"','"+appointment.appointment_date+"','"+appointment.manager_id+"','"+appointment.clients_id+"')";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(note, callback){
		var sql="UPDATE `appointment` SET `title`='"+note.title+"',`body`='"+note.body+"',`manager_id`='"+note.manager_id+"',`client_id`='"+note.client_id+"',`creation_date`='"+note.date+"' WHERE id='"+note.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `appointment` WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}