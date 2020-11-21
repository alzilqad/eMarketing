const db = require("./db");

module.exports = {
    getAll: function (client_id, manager_id, callback) {
        var sql =
          "select a.*,c.*,m.id,m.company_name from appointment a, client c, manager m where a.clients_id = '" +
          client_id +
          "' and a.manager_id = '" +
          manager_id +
          "' and a.clients_id = c.client_id and a.manager_id = m.id";
        db.getResults(sql, function (results) {
          callback(results);
        });
      },
}