const db = require("../models");
const Bus = db.bus_details;
const BusSchedule = db.bus_schedule;
const Flight = db.flight_details;
const FlightSchedule = db.flight_schedule;
const Train = db.train_details;
const TrainSchedule = db.train_schedules;
const sequelize = db.sequelize;
const countAdminDetails = async (req, res, next) => {
  try {
    const ProfitBooking = await sequelize.query(
      'SELECT SUM(total_fare) as profit from booking_records WHERE YEAR(journey_date) = YEAR(CURRENT_DATE) AND booking_status = "confirm"'
    );
    const lossBooking = await sequelize.query(
      'SELECT SUM(total_fare) as loss from booking_records WHERE YEAR(journey_date) = YEAR(CURRENT_DATE) AND booking_status = "cancel"'
    );
    // console.log(ProfitBooking[0]["profit"]);
    const yearlyUser = await sequelize.query(
      "SELECT COUNT(*) as users FROM `users` WHERE deletedAt IS NULL"
    );
    const monthlySale = await sequelize.query(
      'SELECT SUM(total_fare) as profit from booking_records WHERE MONTH(journey_date) = MONTH(CURRENT_DATE) AND booking_status = "confirm"'
    );
    return res.json({
      YearlyProfit: ProfitBooking[0],
      YearlyLoss: lossBooking[0],
      yearlyUser: yearlyUser[0],
      monthlySale: monthlySale[0],
      success: true,
    });
  } catch (e) {
    return next(createError(500, "Error while fetching booking records " + e));
  }
};
const userCountPerMonth = async (req, res, next) => {
  try {
    const BookingCountPerMonth = await sequelize.query(
      "SELECT SUM(IF(MONTH(journey_date) = 1, total_fare, 0)) AS Jan, SUM(IF(MONTH(journey_date) = 2, total_fare, 0)) AS Feb, SUM(IF(MONTH(journey_date) = 3, total_fare, 0)) AS Mar, SUM(IF(MONTH(journey_date) = 4, total_fare, 0)) AS Apr, SUM(IF(MONTH(journey_date) = 5, total_fare, 0)) AS May, SUM(IF(MONTH(journey_date) = 6, total_fare, 0)) AS Jun, SUM(IF(MONTH(journey_date) = 7, total_fare, 0)) AS Jul, SUM(IF(MONTH(journey_date) = 8, total_fare, 0)) AS Aug, SUM(IF(MONTH(journey_date) = 9, total_fare, 0)) AS Sep, SUM(IF(MONTH(journey_date) = 10, total_fare, 0)) AS OCT, SUM(IF(MONTH(journey_date) = 11, total_fare, 0)) AS Nov, SUM(IF(MONTH(journey_date) = 12, total_fare, 0)) AS `Dec` FROM booking_records WHERE YEAR(journey_date) = YEAR(CURRENT_DATE) AND booking_status = 'confirm'"
    );

    let data = BookingCountPerMonth[0][0];
    const monthlySale = [
      parseInt(data.Jan),
      parseInt(data.Feb),
      parseInt(data.Mar),
      parseInt(data.Apr),
      parseInt(data.May),
      parseInt(data.Jun),
      parseInt(data.Jul),
      parseInt(data.Aug),
      parseInt(data.Sep),
      parseInt(data.OCT),
      parseInt(data.Nov),
      parseInt(data.Dec),
    ];

    const userCountPerMonth = await sequelize.query(`SELECT
    SUM(IF(MONTH(createdAt) = 1, 1, 0))  AS Jan,
    SUM(IF(MONTH(createdAt) = 2, 1, 0))  AS Feb,
    SUM(IF(MONTH(createdAt) = 3, 1, 0))  AS Mar,
    SUM(IF(MONTH(createdAt) = 4, 1, 0))  AS Apr,
    SUM(IF(MONTH(createdAt) = 5, 1, 0))  AS May,
    SUM(IF(MONTH(createdAt) = 6, 1, 0))  AS Jun,
    SUM(IF(MONTH(createdAt) = 7, 1, 0))  AS Jul,
    SUM(IF(MONTH(createdAt) = 8, 1, 0))  AS Aug,
    SUM(IF(MONTH(createdAt) = 9, 1, 0))  AS Sep,
    SUM(IF(MONTH(createdAt) = 10, 1, 0)) AS OCT,
    SUM(IF(MONTH(createdAt) = 11, 1, 0)) AS Nov,
    SUM(IF(MONTH(createdAt) = 12, 1, 0)) AS 'Dec'
    FROM users `);

    // console.log(parseInt(data.Jan));
    data = userCountPerMonth[0][0];
    const monthlyUser = [
      parseInt(data.Jan),
      parseInt(data.Feb),
      parseInt(data.Mar),
      parseInt(data.Apr),
      parseInt(data.May),
      parseInt(data.Jun),
      parseInt(data.Jul),
      parseInt(data.Aug),
      parseInt(data.Sep),
      parseInt(data.OCT),
      parseInt(data.Nov),
      parseInt(data.Dec),
    ];

    const LossCountPerMonth = await sequelize.query(
      "SELECT SUM(IF(MONTH(journey_date) = 1, total_fare, 0)) AS Jan, SUM(IF(MONTH(journey_date) = 2, total_fare, 0)) AS Feb, SUM(IF(MONTH(journey_date) = 3, total_fare, 0)) AS Mar, SUM(IF(MONTH(journey_date) = 4, total_fare, 0)) AS Apr, SUM(IF(MONTH(journey_date) = 5, total_fare, 0)) AS May, SUM(IF(MONTH(journey_date) = 6, total_fare, 0)) AS Jun, SUM(IF(MONTH(journey_date) = 7, total_fare, 0)) AS Jul, SUM(IF(MONTH(journey_date) = 8, total_fare, 0)) AS Aug, SUM(IF(MONTH(journey_date) = 9, total_fare, 0)) AS Sep, SUM(IF(MONTH(journey_date) = 10, total_fare, 0)) AS OCT, SUM(IF(MONTH(journey_date) = 11, total_fare, 0)) AS Nov, SUM(IF(MONTH(journey_date) = 12, total_fare, 0)) AS `Dec` FROM booking_records WHERE YEAR(journey_date) = YEAR(CURRENT_DATE) AND booking_status = 'cancel'"
    );

    data = LossCountPerMonth[0][0];
    const monthlyLoss = [
      parseInt(data.Jan),
      parseInt(data.Feb),
      parseInt(data.Mar),
      parseInt(data.Apr),
      parseInt(data.May),
      parseInt(data.Jun),
      parseInt(data.Jul),
      parseInt(data.Aug),
      parseInt(data.Sep),
      parseInt(data.OCT),
      parseInt(data.Nov),
      parseInt(data.Dec),
    ];

    return res.json({
      booking: monthlySale,
      loss: monthlyLoss,
      users: monthlyUser,
      success: true,
    });
  } catch (e) {
    return next(createError(500, "Error while fetching booking records " + e));
  }
};

const adminallBuses = async (req, res, next) => {
  try {
    let buses = await Bus.findAndCountAll({
      paranoid: false,
      // include: [Other],
    });
    // console.log(apiFeatures.)
    res.status(200).json({ buses });
  } catch (err) {
    next(err);
  }
};

const adminallFlights = async (req, res, next) => {
  try {
    let flights = await Flight.findAndCountAll({
      paranoid: false,
      // include: [Other],
    });
    // console.log(apiFeatures.)
    res.status(200).json({ flights });
  } catch (err) {
    next(err);
  }
};
const adminallTrains = async (req, res, next) => {
  try {
    let trains = await Train.findAndCountAll({
      paranoid: false,
      // include: [Other],
    });
    // console.log(apiFeatures.)
    res.status(200).json({ trains });
  } catch (err) {
    next(err);
  }
};
const activeBusWithSchedule = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const busNumber = req.params.id || KT06XC1903;
    const status = await Bus.findOne({
      where: { id: busNumber },
      paranoid: false,
    });
    // console.log(status);
    if (status) {
      let bus = await Bus.update(req.body, {
        where: { id: busNumber },
        paranoid: false,
      });
      bus = await Bus.findOne({ where: { id: busNumber } });
      // console.log(bus);
      if (!bus) return next(createError(422, "Error while Activing bus"));
      const findSchedule = await BusSchedule.findAll({
        where: { bus_id: busNumber },
      });
      if (findSchedule) {
        const busSchedule = await BusSchedule.update(req.body, {
          where: { bus_id: busNumber },
          paranoid: false,
        });
        if (busSchedule) {
          return res.json({
            data: "Bus Activated with it's old schedule successfully",
            status: true,
          });
        } else {
          return createError(422, "error while updating schedule");
        }
      }

      return res.json({
        data: "Bus Activated but it does not containe any schedule",
        status: true,
      });
    }
    return next(createError(422, "Bus does not exist"));
  } catch (error) {
    return next(createError(500, "Error while updating bus details " + error));
  }
};

const activeFlightWithSchedule = async (req, res, next) => {
  try {
    // console.log(req.body);
    const flightNumber = req.params.id;
    const status = await Flight.findOne({
      where: { id: flightNumber },
      paranoid: false,
    });
    // console.log(status);
    if (status) {
      let flight = await Flight.update(req.body, {
        where: { id: flightNumber },
        paranoid: false,
      });
      flight = await Flight.findOne({ where: { id: flightNumber } });
      // console.log(flight);
      if (!flight) return next(createError(422, "Error while Activing flight"));
      const findSchedule = await FlightSchedule.findAll({
        where: { flight_id: flightNumber },
      });
      if (findSchedule) {
        const flightSchedule = await FlightSchedule.update(req.body, {
          where: { flight_id: flightNumber },
          paranoid: false,
        });
        if (flightSchedule) {
          return res.json({
            data: "Flight Activated with it's old schedule successfully",
            status: true,
          });
        } else {
          return createError(422, "error while updating schedule");
        }
      }

      return res.json({
        data: "Flight Activated but it does not containe any schedule",
        status: true,
      });
    }
    return next(createError(422, "flight does not exist"));
  } catch (error) {
    return next(createError(500, error));
  }
};
const activeTrainWithSchedule = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const trainNumber = req.params.id;
    const status = await Train.findOne({
      where: { id: trainNumber },
      paranoid: false,
    });
    // console.log(status);
    if (status) {
      let train = await Train.update(req.body, {
        where: { id: trainNumber },
        paranoid: false,
      });
      train = await Train.findOne({ where: { id: trainNumber } });
      // console.log(train);
      if (!train) return next(createError(422, "Error while Activing train"));
      const findSchedule = await TrainSchedule.findAll({
        where: { train_id: trainNumber },
      });
      if (findSchedule) {
        const trainSchedule = await TrainSchedule.update(req.body, {
          where: { train_id: trainNumber },
          paranoid: false,
        });
        if (trainSchedule) {
          return res.json({
            data: "Train Activated with it's old schedule successfully",
            status: true,
          });
        } else {
          return createError(422, "error while updating schedule");
        }
      }

      return res.json({
        data: "Train Activated but it does not containe any schedule",
        status: true,
      });
    }
    return next(createError(422, "Train does not exist"));
  } catch (error) {
    return next(
      createError(500, "Error while updating Train details " + error)
    );
  }
};
module.exports = {
  countAdminDetails,
  userCountPerMonth,
  adminallBuses,
  adminallFlights,
  adminallTrains,
  activeBusWithSchedule,
  activeFlightWithSchedule,
  activeTrainWithSchedule,
};
