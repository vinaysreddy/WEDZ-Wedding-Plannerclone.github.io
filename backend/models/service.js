const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  // other relevant information
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
