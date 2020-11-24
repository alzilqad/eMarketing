const db = require("./db");

module.exports = {
  getAll: function (client_id, company_id, callback) {
    var sql =
      "select p.*,c.full_name,c.username from proposal p, client c, manager m where p.client_id = '" +
      client_id +
      "' and p.company_id = '" +
      company_id +
      "' and p.client_id = c.client_id and p.manager_id = m.id";
    db.getResults(sql, function (results) {
      callback(results);
    });
  },

  insert: function (proposal, callback) {
    var sql = `insert into proposal(title, subject, body, customer_name, starting_date, deadline_date, status, address, city, state, country, zip_code, email, phone, item, quantity, rate, client_id, manager_id, company_id, posted_by) values('', '${proposal[0]}', '${proposal[1]}', '${proposal[2]}', '${proposal[3]}', '${proposal[4]}', '${proposal[5]}', 'Inactive', '${proposal[7]}', '${proposal[8]}', '${proposal[9]}', '${proposal[10]}', '${proposal[11]}', '${proposal[12]}', '${proposal[13]}', '${proposal[14]}', '${proposal[15]}', '${proposal[16]}', '${proposal[17]}', '${proposal[18]}', '${proposal[19]}', '${proposal[20]}');`;
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  optUp: function (id, callback) {
    var sql = "update proposal set status='Inactive' where id='" + id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });
  },

  approve: function (id, callback) {
    var sql = "update proposal set status='Active' where id='" + id + "'";
    db.execute(sql, function (status) {
      callback(status);
    });

    // var sql = "update proposal set status='Active' where id='"+id+"'";
    // db.execute(sql, function (status) {
    //   callback(status);
    // });
  },
};
