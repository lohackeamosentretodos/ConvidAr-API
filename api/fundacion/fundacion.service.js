const pool = require("../../config/database");

module.exports = {
  setGoal: (data, callback) => {
    pool.query(
      "select * from metas where id_fundacion = ? AND estado = ?",
      [data.id_fundacion, "activa"],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results[0]) {
          pool.query(
            "INSERT INTO metas (id_fundacion, monto, estado) VALUES (?,?,?)",
            [data.id_fundacion, data.monto, "pendiente"],
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }
              return callback(null, results);
            }
          );
        } else {
          pool.query(
            "INSERT INTO metas (id_fundacion, monto, estado) VALUES (?,?,?)",
            [data.id_fundacion, data.monto, "activa"],
            (error, results, fields) => {
              if (error) {
                return callback(error);
              }
              return callback(null, results);
            }
          );
        }
      }
    );
  },
  getTotalMoney: (id_fundacion, callback) => {
    pool.query(
      `SELECT f.id_fundacion, f.nombre_fundacion, f.proposito, f.dinero_total, m.id_meta, m.monto, m.estado 
      FROM metas m 
      LEFT OUTER JOIN fundacion f ON m.id_fundacion = f.id_fundacion WHERE m.estado = ? AND f.id_fundacion = ?`,
      ["activa", id_fundacion],

      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
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
  insertPost: (data, imPath, callback) => {
    pool.query(
      "insert into publicacion(texto, multimedia, id_fundacion) values(?,?, ?)",
      [data.texto, imPath, data.id_fundacion],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  }
};
