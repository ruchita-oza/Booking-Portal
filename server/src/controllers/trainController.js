const db = require("../models");
const Train = db.train_details;
const createError = require("../utils/error");

async function checkExists(id) {
  //   console.log("train number", id);
  const trains = await Train.findAll({
    where: { trainNumber: id },
  });
  return trains.length > 0 ? true : false;
}

const createTrain = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log("in create train");
    const status = await checkExists(req.body.trainNumber);
    // console.log("train status", status);
    if (!status) {
      const data = req.body;
      //   const train = await Train.create({
      //     trainName: req.body.trainName,
      //     trainNumber: req.body.trainNumber,
      //   });
      const train = await Train.create(data);
      await train.save();
      //   res.status(200).send("Train added successfully");

      return res.json({ data: "Train added successfully", status: true });
    } else {
      return next(createError("trainNumber is already registered"));
      //   return createError("trainNumber is already registered");
    }
  } catch (error) {
    return res.json({ data: error, status: false });
  }
};

const updateTrain = async (req, res, next) => {
  try {
    const trainNumber = req.params.id;
    // console.log("in update train");
    const status = await checkExists(trainNumber);
    if (status) {
      const train = await Train.update(req.body, {
        where: { trainNumber: trainNumber },
      });
      // await train.save();

      return res.json({
        data: "train details updated successfully",
        status: true,
      });
    } else {
      return next(createError("Error while updating train details"));
    }
  } catch (error) {
    return res.json({ data: error, status: false });
  }
};

const deleteTrain = async (req, res, next) => {
  try {
    const trainNumber = req.params.id;
    const status = await checkExists(trainNumber);
    if (status) {
      const train = await Train.destroy({ where: { trainNumber } });
      return res.json({ data: "Train deleted successfully", status: true });
    } else {
      return next(createError("Error while deleting train"));
    }
  } catch (error) {
    return res.json({ data: "Error while deleting train", status: false });
  }
};

const getTrainByTrainNumber = async (req, res, next) => {
  try {
    const trainNumber = req.params.id;
    const status = await checkExists(trainNumber);
    if (status) {
      const train = await Train.findOne({
        where: { trainNumber: trainNumber },
      });
      return res.json({
        data: train,
        status: true,
      });
    } else {
      return next(createError("Error while fetching required train"));
    }
  } catch (error) {
    return res.json({
      data: "Error while fetching required train",
      status: false,
    });
  }
};

const getAllTrain = async (req, res, next) => {
  try {
    const trains = await Train.findAll({});
    if (trains) {
      return res.json({ data: trains, status: true });
    } else {
      return res.json({
        data: "Error while fetching all train details",
        status: false,
      });
    }
  } catch (error) {
    return next(createError("Error while fetching all train details"));
  }
};

module.exports = {
  createTrain,
  updateTrain,
  deleteTrain,
  getTrainByTrainNumber,
  getAllTrain,
};
