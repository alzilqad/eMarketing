const db = require("./db");

module.exports = {
  getAll: function (callback) {
    var sql =
      "select c.*, m.full_name from company c, manager m where c.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  getById: function (id, callback) {
    var sql =
      "select m.*, c.* from company c, manager m where c.id = '" +
      id +
      "' and c.manager_id = m.id";
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
