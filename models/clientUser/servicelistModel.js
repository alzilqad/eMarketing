const db = require("./db");

module.exports = {
  getAll: function (username, callback) {
    var sql = "select sh.*,s.*,com.* from service_history sh, service s, client cl, company com where cl.username = '" + username + 
    "' and sh.client_id=cl.client_id and sh.service_id=s.id and s.company_id=com.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },
};
