const db = require("./db");

module.exports = {
  getAll: function (username, callback) {
    var sql =
      "select * from affiliated_companies ac, company c, manager m where ac.client_username = '" +
      username +
      "' and ac.company_name = c.company_name and c.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getByName: function (username, name, callback) {
    var sql =
      "select * from affiliated_companies ac, company c, manager m where ac.client_username = '" +
      username +
      "' and ac.company_name = c.company_name and c.manager_id = m.id and c.company_name like '%" +
      name +
      "%'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getById: function (username, id, callback) {
    var sql =
      "select * from affiliated_companies ac, company c, manager m where ac.client_username = '" +
      username +
      "' and ac.id = '" +
      id +
      "' and ac.company_name = c.company_name and c.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
