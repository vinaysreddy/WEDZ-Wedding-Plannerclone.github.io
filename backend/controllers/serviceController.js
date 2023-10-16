const Service = require('../models/service');


// Add a new service (this might only be used by admins)
exports.addService = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newService = new Service({
      name,
      description,
      price,
    });

    const service = await newService.save();
    res.json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// other CRUD operations for services...
