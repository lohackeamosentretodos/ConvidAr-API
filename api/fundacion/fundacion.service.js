const pool = require("../../config/database");

module.export = {
    setGoal: (data, callback) => {
        pool.query(
            "INSERT INTO metas (id_fundacion) VALUES (?)",
            [data.id_fundacion],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                  }
                  return callback(null, results);
            }
        );
    }
}