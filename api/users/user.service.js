const pool = require("../../config/database");

module.exports = {
  getFoundations: callback => {
    pool.query(
      `SELECT f.id_fundacion, f.nombre_fundacion, f.proposito, f.dinero_total, m.id_meta, m.monto, m.estado 
      FROM metas m 
      LEFT OUTER JOIN fundacion f ON m.id_fundacion = f.id_fundacion WHERE m.estado = ?`,
      ["activa"],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  pagar: (data, callback) => {
    var dinero_total;
    var pago = data.dinero_pago;
    pool.query(
      "SELECT dinero_total FROM fundacion WHERE id_fundacion = ?",
      [data.id_fundacion],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          dinero_total = JSON.parse(JSON.stringify(results[0])).dinero_total;
          dinero_total = dinero_total + pago;
          pool.query(
            "update fundacion set dinero_total = ? where id_fundacion = ?",
            [dinero_total, data.id_fundacion],
            (error, results, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, results);
              }
            }
          );
        }
      }
    );
  },
  getFeedback: callback => {
    pool.query(
      `SELECT f.id_fundacion, f.nombre_fundacion,p.texto,p. multimedia
      FROM publicacion p 
      LEFT OUTER JOIN fundacion f ON p.id_fundacion = f.id_fundacion`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getFoundationGoals: (id, callback) => {
    pool.query(
      `SELECT f.id_fundacion, f.nombre_fundacion, f.proposito, f.dinero_total, m.id_meta, m.monto, m.estado 
      FROM metas m 
      LEFT OUTER JOIN fundacion f ON m.id_fundacion = f.id_fundacion WHERE f.id_fundacion = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  }
  // getUserByUserEmail: (email, callback) => {
  //   pool.query(
  //     `select * from registration where email = ?`,
  //     [email],
  //     (error, results, fields) => {
  //       if (error) {
  //         return callback(error);
  //       }
  //       return callback(null, results[0]);
  //     }
  //   );
  // }
};
