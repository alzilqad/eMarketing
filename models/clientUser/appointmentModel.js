const db = require("./db");

module.exports = {
  getAll: function (client_id, manager_id, callback) {
    var sql =
      "select a.*,c.*,m.company_name from appointment a, client c, manager m where a.clients_id = '" +
      client_id +
      "' and a.manager_id = '" +
      manager_id +
      "' and a.clients_id = c.client_id and a.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insert: function (appointment, callback) {
    var sql = `insert into appointment (id, title, body, creation_date, appointment_date, manager_id, clients_id, posted_by) values('', '${appointment[0]}', '${appointment[1]}', '${appointment[2]}', '${appointment[3]}', '${appointment[4]}', '${appointment[5]}', '${appointment[6]}');`;
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  update: function (appointment, id, callback) {
    var sql = `update appointment set title='${appointment[0]}', body='${appointment[1]}', creation_date='${appointment[2]}', appointment_date='${appointment[3]}' where id='${id}'`;
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  delete: function (appointment_id, callback) {
    var sql = "DELETE from appointment where id='" + appointment_id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
