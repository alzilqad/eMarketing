const db = require("./db");

module.exports = {
  getAll: function (client_id, company_id, callback) {
    var sql =
      "select * from proposal p, client c, manager m where p.client_id = '" +
      client_id +
      "' and p.company_id = '" +
      company_id +
      "' and p.client_id = c.client_id and p.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
