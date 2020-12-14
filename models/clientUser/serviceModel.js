const db = require("./db");

module.exports = {
    getAll: function (company_id, callback) {
        var sql =
          "select * from service where company_id = '" +
          company_id +
          "'";
        db.getResults(sql, function (results) {
          callback(results);
        });
      },
}