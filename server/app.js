const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/database/connection");
const cookieParser = require("cookie-parser");
let app = express();
dotenv.config();
const PORT = process.env.PORT;
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/users");
const cityRoute = require("./src/routes/city");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create express route
const router = express.Router();
app.use(router);

//DB connection
require("./src/database/connection");

//middleware
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/city", cityRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(PORT, (err) => {
  if (err) return console.log(`cannot connect to port : ${PORT}`);
  console.log(`Server is Listening on  : http://localhost:${PORT}`);
});
