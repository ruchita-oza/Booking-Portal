const db = require("../models");
const Train = db.train_details;
const City = db.cities;
const createError = require("../utils/error");
const TrainSchedule = db.train_schedules;
const ApiFeatures = require("../utils/apiFeatures");

async function checkExistsTrain(id) {
  const trains = await Train.findAll({ where: { train_number: id } });
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
      return next(createError(422, "Train number doesnot exists"));
    } else if (!sourceCityStatus) {
      return next(createError(422, "Source city doesnot exists"));
    } else if (!destinationCityStatus) {
      return next(createError(422, "Destination city doesnot exists"));
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
      return next(createError(422, "Train schedule doesnot exists"));
    }
    if (!trainStatus) {
      return next(createError(422, "Train number doesnot exists"));
    } else if (!sourceCityStatus) {
      return next(createError(422, "Source city doesnot exists"));
    } else if (!destinationCityStatus) {
      return next(createError(422, "Destination city doesnot exists"));
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

const viewAllTrainSchedule = async (req, res, next) => {
  try {
    const trainschedules = await TrainSchedule.findAll({});
    return res.json({ data: trainschedules, status: true });
  } catch (error) {
    return next(
      createError(500, "Error while fetching train schedule " + error)
    );
  }
};

const viewTrainScheduleById = async (req, res, next) => {
  try {
    const trainScheduleId = req.params.id;
    const status = await checkExistsTrainSchedule(trainScheduleId);
    if (status) {
      const trainschedule = await TrainSchedule.findAll({
        where: { id: trainScheduleId },
      });
      return res.json({ data: trainschedule, status: true });
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
    const apiFeatures = new ApiFeatures(TrainSchedule, req.query)
      .priceFilter()
      .filter();
    let trainschedules = await apiFeatures.query;
    return res.json({ data: trainschedules, status: true });
  } catch (error) {
    return next(createError(500, "Error fetching train schedule" + error));
  }
};

module.exports = {
  createTrainSchedule,
  updateTrainSchedule,
  deleteTrainSchedule,
  viewAllTrainSchedule,
  viewTrainScheduleById,
  viewTrainSchedules,
};
