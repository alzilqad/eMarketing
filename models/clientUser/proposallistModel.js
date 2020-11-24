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
