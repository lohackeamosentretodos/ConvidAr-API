require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./api/users/user.router");
const fundacionRouter = require("./api/fundacion/fundacion.router");

app.use(express.json());
app.use("/", userRouter);
app.use("/fundacion", fundacionRouter);
app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT : ", process.env.APP_PORT);
});
