const pool = require("../../config/database");

module.exports = {
  setGoal: (data, callback) => {
    pool.query(
      "INSERT INTO metas (id_fundacion, monto, estado) VALUES (?,?,?)",
      [data.id_fundacion, data.monto, data.estado],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  register: (data, callback) => {
    pool.query(
      `insert into fundacion(nombre_fundacion, foto, proposito, dinero_total, user, password) values(?,?,?,?,?,?)`,
      [
        data.nombre_fundacion,
        data.foto,
        data.proposito,
        data.dinero_total,
        data.user,
        data.password
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserByUserName: (user, callback) => {
    pool.query(
      `select * from fundacion where user = ?`,
      [user],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  insertPost: (data, callback) => {
    pool.query(
      "insert into publicacion(texto, multimedia, id_fundacion) values(?,?, ?)",
      [data.texto, data.multimedia, data.id_fundacion],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  }
};
