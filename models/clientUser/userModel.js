const db = require("./db");

module.exports = {
  validate: function (user, callback) {
    var sql =
      "select * from client where username='" +
      user.username +
      "' and password='" +
      user.password +
      "'";
    db.getResults(sql, function (results) {
      if (results.length > 0) {
        callback(true, results[0].user_type);
      } else {
        callback(false);
      }
    });
  },

  // getAll: function (callback) {
  //   var sql = "select * from user where user_type = 'user'";
  //   db.getResults(sql, function (results) {
  //     callback(results);
  //   });
  // },

  // getById: function (id, callback) {
  //   var sql = "select * from user where user_id='" + id + "'";
  //   db.getResults(sql, function (results) {
  //     callback(results);
  //   });
  // },

  getByUsername: function (username, callback) {
    var sql = "select * from client where username = '" + username + "'";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insert: function (user, callback) {
    var sql = `insert into client (client_id, username, password, full_name, contact_no, email, address, country, gender, dob, status) values('', '${user[0]}', '${user[1]}', '${user[2]}', '${user[3]}', '${user[4]}', '${user[5]}', '${user[6]}', '${user[7]}', '${user[8]}', 'active');`;
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  update: function (id, user, callback) {
    var sql = `update client set full_name='${user[1]}', contact_no='${user[2]}', email='${user[3]}', address='${user[4]}', country='${user[5]}', gender='${user[6]}', dob='${user[7]}' where client_id='${id}'`;
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  // delete: function (id, callback) {
  //   var sql = "DELETE from user where user_id='" + id + "'";
  //   db.getResults(sql, function (results) {
  //     callback(results);
  //   });
  // },

  // getByName: function (name, callback) {
  //   var sql = "select * from user where user_type = 'user' and full_name like '%" + name + "%'";
  //   db.getResults(sql, function (results) {
  //     callback(results);
  //   });
  // },
};
