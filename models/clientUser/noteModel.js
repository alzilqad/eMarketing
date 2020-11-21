const db = require("./db");

module.exports = {
  getAll: function (client_id, manager_id, callback) {
    var sql =
      "select n.*,c.*,m.id,m.company_name from note n, client c, manager m where n.client_id = '" +
      client_id +
      "' and n.manager_id = '" +
      manager_id +
      "' and n.client_id = c.client_id and n.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
