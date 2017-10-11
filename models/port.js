const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortSchema = new Schema({
  "name": String,
  "country": String,
  "FreightPerM3": Number
})

const Port = mongoose.model('ports', PortSchema)  // ten collection, schema

module.exports = Port;