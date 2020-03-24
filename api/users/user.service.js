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
  getFeedback: callback => {
    pool.query(
      `SELECT f.id_fundacion, f.nombre_fundacion, f.proposito, f.dinero_total, p.texto,p. multimedia
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
