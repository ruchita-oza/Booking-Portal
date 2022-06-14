const db = require("../models");
const Train = db.train_details;
const City = db.cities;
const createError = require("../utils/error");
const TrainSchedule = db.train_schedules;
const ApiFeatures = require("../utils/apiFeatures");
const {
  findTrainScheduleById,
  findAllTrainSchedules,
} = require("../dao/train.dao");

async function checkExistsTrain(id) {
  const trains = await Train.findAll({ where: { id } });
  return trains.length > 0 ? true : false;
}

async function checkExistsCity(id) {
  const cities = await City.findAll({ where: { id: id } });
  return cities.length > 0 ? true : false;
}

async function checkExistsTrainSchedule(id) {
  const trainschedules = await TrainSchedule.findAll({ where: { id: id } });

  return trainschedules.length > 0 ? true : false;
}

const createTrainSchedule = async (req, res, next) => {
  try {
    const train_number = req.body.train_id;
    const source = req.body.source;
    const destination = req.body.destination;
    const departureTime = req.body.departure_time;
    const arrivalTime = req.body.arrival_time;
    const totalAvailableSeats = req.body.total_available_seats;
    const trainStatus = await checkExistsTrain(train_number);
    const sourceCityStatus = await checkExistsCity(source);
    const destinationCityStatus = await checkExistsCity(destination);

    if (!trainStatus) {
      return next(createError(422, "Train number does not exists"));
    } else if (!sourceCityStatus) {
      return next(createError(422, "Source city does not exists"));
    } else if (!destinationCityStatus) {
      return next(createError(422, "Destination city does not exists"));
    } else if (source == destination) {
      return next(
        createError(422, "Source city and destination city should not be same")
      );
    } else if (departureTime == arrivalTime) {
      return next(
        createError(422, "Arrival time and departure time should not be same")
      );
    } else if (totalAvailableSeats == 0) {
      return next(createError(422, "Total available seats cannot be zero"));
    } else {
      console.log(req.body);
      const train = await TrainSchedule.create(req.body);
      await train.save();
      return res.json({
        data: "Train schedule created successfully",
        status: true,
      });
    }
  } catch (error) {
    return next(
      createError(500, "Error while creating train schedule " + error)
    );
  }
};

const updateTrainSchedule = async (req, res, next) => {
  try {
    const trainScheduleId = req.params.id;
    const source = req.body.source;
    const destination = req.body.destination;
    const departureTime = req.body.departure_time;
    const arrivalTime = req.body.arrival_time;
    const trainScheduleStatus = await checkExistsTrainSchedule(trainScheduleId);
    const trainStatus = await checkExistsTrain(req.body.train_id);
    const sourceCityStatus = await checkExistsCity(req.body.source);
    const destinationCityStatus = await checkExistsCity(req.body.destination);

    if (!trainScheduleStatus) {
      return next(createError(422, "Train schedule does not exists"));
    }
    if (!trainStatus) {
      return next(createError(422, "Train number does not exists"));
    } else if (!sourceCityStatus) {
      return next(createError(422, "Source city does not exists"));
    } else if (!destinationCityStatus) {
      return next(createError(422, "Destination city does not exists"));
    } else if (source == destination) {
      return next(
        createError(422, "Source city and destination city should not be same")
      );
    } else if (departureTime == arrivalTime) {
      return next(
        createError(422, "Arrival time and departure time should not be same")
      );
    } else {
      const trainschedule = await TrainSchedule.update(req.body, {
        where: { id: trainScheduleId },
      });

      return res.json({
        data: "Train schedule updated successfully",
        status: true,
      });
    }
  } catch (error) {
    return next(
      createError(500, "Error while updating train schedule " + error)
    );
  }
};

const deleteTrainSchedule = async (req, res, next) => {
  try {
    const trainScheduleId = req.params.id;
    const status = await checkExistsTrainSchedule(trainScheduleId);
    if (status) {
      const trainschedule = await TrainSchedule.destroy({
        where: { id: trainScheduleId },
      });
      return res.json({
        data: "Train  schedule deleted successfully",
        status: true,
      });
    } else {
      return next(createError(500, "Error while deleting train schedule"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while deleting train schedule " + error)
    );
  }
};

// const viewAllTrainSchedule = async (req, res, next) => {
//   try {
//     // const trainschedules = await TrainSchedule.findAll({});
//     const trainschedules = await findAllTrainSchedules();
//     // let data = [];
//     // trainschedules.forEach((element) => {
//     //   let train_schedule_data = [...element];
//     //   train_schedule_data.source_name = element.source_name[0]?.city_name;
//     //   train_schedule_data.destination_name =
//     //     element.destination_name[0]?.city_name;
//     //   data.push(train_schedule_data);
//     // });
//     // console.log(data);
//     return res.json({ data: trainschedules, status: true });
//   } catch (error) {
//     return next(
//       createError(500, "Error while fetching train schedule " + error)
//     );
//   }
// };

const viewTrainScheduleById = async (req, res, next) => {
  try {
    const trainScheduleId = req.params.id;
    const status = await checkExistsTrainSchedule(trainScheduleId);
    if (status) {
      // const trainschedule = await TrainSchedule.findAll({
      //   where: { id: trainScheduleId },
      // });
      const trainschedule = await findTrainScheduleById(trainScheduleId);
      // console.log("train schedule: " + trainschedule);
      // let data = [];
      // trainschedule.forEach(element => {
      //   let train_schedule_data = [...element];
      //   train_schedule_data.source_name = element.source_name[0]?.city_name
      //   train_schedule_data.destination_name = element.source_name[0]?.city_name;
      //   data.push(train_schedule_data)
      // });
      let train_schedule_data = JSON.parse(JSON.stringify(trainschedule[0]));
      // console.log(train_schedule_data);
      train_schedule_data.source_name =
        train_schedule_data.source_name?.city_name;
      train_schedule_data.destination_name =
        train_schedule_data.destination_name?.city_name;
      return res.json({ data: train_schedule_data, status: true });
    } else {
      return next(createError(500, "Error while fetching train schedule"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while fetching train schedule " + error)
    );
  }
};

const viewTrainSchedules = async (req, res, next) => {
  try {
    const resultPerPage = 5;
    const apiFeatures = new ApiFeatures(TrainSchedule, req.query)
      .priceFilter()
      .timeFilter()
      .TicketFilter()
      .pagination(resultPerPage)
      .filter();
    // let trainschedules = await apiFeatures.query;
    let trainschedules = await findAllTrainSchedules({
      queryCopy: apiFeatures.queryCopy,
      priceQuery: apiFeatures.priceQuery,
      timeQuery: apiFeatures.timeQuery,
      ticketQuery: apiFeatures.ticketQuery,
      skip: apiFeatures.skip,
      resultPerPage,
    });
    return res.json({ data: trainschedules, status: true });
  } catch (error) {
    return next(createError(500, "Error fetching train schedule" + error));
  }
};

const createTrainScheduleFromArray = async (req, res, next) => {
  try {
    let scheduleData = req.body;
    for (let i = 0; i < scheduleData.length; i++) {
      try {
        const trainId = scheduleData[i]?.train_id;
        const source = scheduleData[i]?.source;
        const destination = scheduleData[i]?.destination;
        const arrivalTime = scheduleData[i]?.arrival_time;
        const departureTime = scheduleData[i]?.departure_time;
        const totalAvailableSeats = scheduleData[i]?.total_available_seats;
        const pricePerSeat = scheduleData[i]?.price_per_seat;

        const trainExistsStatus = await checkExistsTrain(trainId);
        const sourceCityStatus = await checkExistsCity(source);
        const destinationCityStatus = await checkExistsCity(destination);

        if (!trainExistsStatus) {
          return next(createError(422, "Error train does not exists"));
        }

        if (!sourceCityStatus) {
          return next(createError(422, "Error source city does not exists"));
        }

        if (!destinationCityStatus) {
          return next(
            createError(422, "Error destination city does not exists")
          );
        }

        if (arrivalTime == departureTime) {
          return next(
            createError(
              422,
              "Error arrival time and departure time cannot be same"
            )
          );
        }

        if (departureTime > arrivalTime) {
          return next(
            createError(
              422,
              "Error departure time cannot be greater than arrival time"
            )
          );
        }

        if (totalAvailableSeats == 0) {
          return next(
            createError(422, "Error total available seat cannot be zero")
          );
        }

        if (pricePerSeat == 0) {
          return next(createError(422, "Error price per seat cannot be zero"));
        }

        if (pricePerSeat < 0) {
          return next(
            createError(422, "Error price per seat cannot be less than zero")
          );
        }

        const trainSchedule = await TrainSchedule.create(scheduleData[i]);
        await trainSchedule.save();
      } catch (error) {
        throw error;
      }
    }
    return res.json({
      data: "Train schedule created successfully",
      status: true,
    });
  } catch (error) {
    return next(createError(500, "Error adding train schedule " + error));
  }
};

module.exports = {
  createTrainSchedule,
  updateTrainSchedule,
  deleteTrainSchedule,
  // viewAllTrainSchedule,
  viewTrainScheduleById,
  viewTrainSchedules,
  createTrainScheduleFromArray,
};
