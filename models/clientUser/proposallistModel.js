const db = require("./db");

module.exports = {
  getAll: function (client_username, callback) {
    var sql =
      "select p.*, c.full_name,c.username from proposal p, client c where c.username = '" +
      client_username +
      "' and p.client_id = c.client_id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
