const db = require("../models");

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
module.exports = { countAdminDetails, userCountPerMonth };
