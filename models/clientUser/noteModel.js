const db = require("./db");

module.exports = {
  getAll: function (client_id, manager_id, callback) {
    var sql =
      "select n.*,c.*,m.company_name from note n, client c, manager m where n.client_id = '" +
      client_id +
      "' and n.manager_id = '" +
      manager_id +
      "' and n.client_id = c.client_id and n.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insert: function (note, callback) {
    var sql = `insert into note (id, title, body, manager_id, client_id, creation_date, posted_by) values('', '${note[0]}', '${note[1]}', '${note[2]}', '${note[3]}', '${note[4]}', '${note[5]}');`;
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  delete: function (note_id, callback) {
    var sql = "DELETE from note where id='" + note_id + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
