const {
  getFoundationGoals,
  getFoundations,
  getFeedback,
  pagar,
  getUserByUserEmail
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  getFoundationGoals: (req, res) => {
    const id_fundacion = req.params.id_fundacion;
    getFoundationGoals(id_fundacion, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  pagar: (req, res) => {
    let data = req.body;
    const id_fundacion = req.params.id_fundacion;
    data.id_fundacion = id_fundacion;

    pagar(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  getFoundations: (req, res) => {
    getFoundations((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getFeedback: (req, res) => {
    getFeedback((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        data: results
      });
    });
  }

  // login: (req, res) => {
  //   const body = req.body;
  //   getUserByUserEmail(body.user, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     if (!results) {
  //       return res.json({
  //         success: 0,
  //         data: "invalid email or password"
  //       });
  //     }
  //     const result = compareSync(body.password, results.password);
  //     if (result) {
  //       results.password = undefined;
  //       const jsontoken = sign({ result: results }, "qwe1234", {
  //         expiresIn: "1h"
  //       });
  //       return res.json({
  //         success: 1,
  //         message: "login successsfully",
  //         token: jsontoken
  //       });
  //     } else {
  //       return res.json({
  //         success: 0,
  //         data: "invalid email or password"
  //       });
  //     }
  //   });
  // }
};
