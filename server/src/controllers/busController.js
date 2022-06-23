const db = require("../models");
const Bus = db.bus_details;
const BusSchedule = db.bus_schedule;
const Apifeatures = require("../utils/apiFeatures");
const createError = require("../utils/error");
const { busSchema } = require("../utils/validationSchema");

async function checkExists(bus_number) {
  // console.log(bus_number);
  const bus = await Bus.findAll({
    where: { id: bus_number },
  });
  return bus.length > 0 ? true : false;
}

const createBus = async (req, res, next) => {
  try {
    const result = await busSchema.validateAsync(req.body);
    // console.log(result);
    const status = await checkExists(result.id);
    if (status)
      return next(
        createError(
          401,
          `${result.id} already exists please use another busNumber`
        )
      );
    const newBus = await Bus.create({
      id: result.id,
      bus_name: result.bus_name,
      bus_type: result.bus_type,
    });
    await newBus.save();
    return res.json({ data: "Bus added successfully", status: true });
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};

const updateBus = async (req, res, next) => {
  try {
    const busNumber = req.params.id;
    const status = await checkExists(busNumber);
    if (status) {
      const data = await busSchema.validateAsync(req.body);
      const bus = await Bus.update(data, {
        where: { id: busNumber },
      });

      return res.json({
        data: "Bus details updated successfully",
        status: true,
      });
    }

    return next(createError(422, "Error while updating bus details"));
  } catch (error) {
    return next(createError(500, "Error while updating bus details " + error));
  }
};

const deleteBus = async (req, res, next) => {
  try {
    const status = await checkExists(req.params.id);
    if (status) {
      await Bus.destroy({ where: { id: req.params.id } });
      return res.json({
        data: "Bus details deleted successfully",
        status: true,
      });
    } else {
      return next(createError(422, "Bus number does not exists"));
    }
  } catch (err) {
    next(err);
  }
};

// const getBus = async (req, res, next) => {
//   try {
//     const bus = await Bus.findOne({ where: { id: req.params.id } });
//     res.status(200).json(bus);
//   } catch (err) {
//     next(err);
//   }
// };

const getBusByBusNumber = async (req, res, next) => {
  try {
    const busNumber = req.params.id;
    const status = await checkExists(busNumber);
    if (status) {
      const bus = await Bus.findAll({ where: { id: busNumber } });
      return res.json({ data: bus, status: true });
    } else {
      return next(createError(422, "Bus number does not exits"));
    }
  } catch (err) {
    next(err);
  }
};

const getBuses = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(Bus, req.query).filter();
    let buses = await apiFeatures.query;
    // console.log(apiFeatures.)
    res.status(200).json({ buses });
  } catch (err) {
    next(err);
  }
};

const deleteBusDetailAndSchedule = async (req, res, next) => {
  try {
    const busNumber = req.params.id;
    const busExistsStatus = await checkExists(busNumber);
    if (!busExistsStatus) {
      return next(createError(422, "Error bus does not exists"));
    }

    await BusSchedule.destroy({ where: { bus_id: busNumber } });

    await Bus.destroy({ where: { id: busNumber } });

    return res.json({
      data: "Bus detail and its schedules deleted successfully",
      status: true,
    });
  } catch (error) {
    return next(createError(500, "Error deleting bus detail and schedule"));
  }
};

module.exports = {
  createBus,
  getBusByBusNumber,
  updateBus,
  deleteBus,
  // getBus,
  getBuses,
  deleteBusDetailAndSchedule,
};
