const db = require("./db");

module.exports = {
  getAll: function (username, callback) {
    var sql =
      "select * from affiliated_companies ac, company c, manager m where ac.client_username = '" +
      username +
      "' and ac.company_id = c.id and c.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getById: function (username, id, callback) {
    var sql =
      "select ac.*, m.*, c.*, client.client_id, client.username from affiliated_companies ac, company c, manager m, client where ac.client_username = '" +
      username +
      "' and ac.affiliated_company_id = '" +
      id +
      "' and ac.company_id = c.id and c.manager_id = m.id and ac.client_username=client.username";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  optUp: function (id, callback) {
    var sql = "update proposal set status='Inactive' where id='"+id+"'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  approve: function (id, callback) {
    var sql = "update proposal set status='Active' where id='"+id+"'";
    db.execute(sql, function (status) {
      callback(status);
    });

    // var sql = "update proposal set status='Active' where id='"+id+"'";
    // db.execute(sql, function (status) {
    //   callback(status);
    // });
  },
};
