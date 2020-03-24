const {
  setGoal,
  register,
  getUserByUserName,
  insertPost
} = require("./fundacion.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  setGoal: (req, res) => {
    const data = req.body;
    const base64Credentials = req.headers.authorization.split(".")[1];
    const credentials = JSON.parse(
      Buffer.from(base64Credentials, "base64").toString("ascii")
    );
    data.id_fundacion = credentials.sub;
    setGoal(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "database connection error"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  RegisterFoundation: (req, res) => {
    const body = req.body;

    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    register(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      return res.status(403).json({ message: "Missing Authorization Header" });
    }

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [user, password] = credentials.split(":");

    getUserByUserName(user, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          data: "invalid email or password"
        });
      }
      const result = compareSync(password, results.password);
      if (result) {
        results.password = undefined;

        const jsontoken = sign(
          { sub: results.id_fundacion },

          process.env.JSONTOKEN_KEY,
          {
            expiresIn: "24h"
          }
        );
        return res.json({
          success: 1,
          message: "login successsfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "invalid email or password"
        });
      }
    });
  },
  insertPost: (req, res) => {
    const data = req.body;
    const base64Credentials = req.headers.authorization.split(".")[1];
    const credentials = JSON.parse(
      Buffer.from(base64Credentials, "base64").toString("ascii")
    );

    data.id_fundacion = credentials.sub;
    insertPost(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "database connection error"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  }
};
