const db = require("../models");
const Train = db.train_details;
const createError = require("../utils/error");
const { trainSchema } = require("../utils/validationSchema");

async function checkExists(id) {
  const trains = await Train.findAll({
    where: { id },
  });
  return trains.length > 0 ? true : false;
}

const createTrain = async (req, res, next) => {
  try {
    const data = await trainSchema.validateAsync(req.body);
    const status = await checkExists(data.id);
    if (!status) {
      // const data = data;
      const train = await Train.create(data);
      await train.save();

      return res.json({ data: "Train added successfully", status: true });
    } else {
      return next(createError(500, "Train number is already registered"));
    }
  } catch (error) {
    return next(createError(500, "Error while creating train " + error));
  }
};

const updateTrain = async (req, res, next) => {
  try {
    const train_number = req.params.id;
    const status = await checkExists(train_number);
    if (status) {
      const data = await trainSchema.validateAsync(req.body);
      const train = await Train.update(data, {
        where: { id: train_number },
      });

      return res.json({
        data: "train details updated successfully",
        status: true,
      });
    } else {
      return next(createError(500, "Error while updating train details"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while updating train details " + error)
    );
  }
};

const deleteTrain = async (req, res, next) => {
  try {
    const train_number = req.params.id;
    const status = await checkExists(train_number);
    if (status) {
      const train = await Train.destroy({ where: { id: train_number } });
      return res.json({ data: "Train deleted successfully", status: true });
    } else {
      return next(createError(500, "Error train number does not exists"));
    }
  } catch (error) {
    return next(createError(500, "Error while deleting train " + error));
  }
};

const getTrainByTrainNumber = async (req, res, next) => {
  try {
    const train_number = req.params.id;
    const status = await checkExists(train_number);
    if (status) {
      const train = await Train.findOne({
        where: { id: train_number },
      });
      return res.json({
        data: train,
        status: true,
      });
    } else {
      return next(createError(500, "Error while fetching required train"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while fetching required train " + error)
    );
  }
};

const getAllTrain = async (req, res, next) => {
  try {
    const trains = await Train.findAll({});
    if (trains) {
      return res.json({ data: trains, status: true });
    } else {
      return next(createError(500, "Error while fetching all train details"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while fetching all train details " + error)
    );
  }
};

module.exports = {
  createTrain,
  updateTrain,
  deleteTrain,
  getTrainByTrainNumber,
  getAllTrain,
};
