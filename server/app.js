const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
let app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/users");
const cityRoute = require("./src/routes/city");
const stateRoute = require("./src/routes/state");
const busRoute = require("./src/routes/BusDetails");
const busScheduleRoute = require("./src/routes/busSchedule");
const trainRoute = require("./src/routes/TrainDetailsRoutes");
const flightRoute = require("./src/routes/flightDetails");
const flightScheduleRoute = require("./src/routes/flightSchedule");
const trainScheduleRoute = require("./src/routes/TrainScheduleRoutes");
const bookingRecordRoute = require("./src/routes/bookingRecordRoutes");
const passengerDetailsRoutes = require("./src/routes/PassengerDetailsRoutes");
const admin = require("./src/routes/admin");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
app.use(router);

app.use(cookieParser());
app.use("/authRoute", authRoute);
app.use("/user", userRoute);
app.use("/city", cityRoute);
app.use("/state", stateRoute);
app.use("/bus/details", busRoute);
app.use("/bus/Schedule", busScheduleRoute);
app.use("/train/details", trainRoute);
app.use("/flight/details", flightRoute);
app.use("/flight/Schedule", flightScheduleRoute);
app.use("/train/schedule", trainScheduleRoute);
app.use("/booking/record", bookingRecordRoute);
app.use("/passenger/details", passengerDetailsRoutes);
app.use("/adminApi", admin);

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
  console.log(`Server is Listening on : http://localhost:${PORT}`);
});
