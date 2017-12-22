const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const CarSchema = new Schema({
    "Ref": String,
    "make": String,
    "model": String,
    "FOB": Number,
    "VehicleWidth": Number,
    "VehicleLength": Number,
    "VehicleHeight": Number,
    "Volume": Number
});

CarSchema.pre('save', function (next) {
    const x = this
    console.log(x)
    next()
})
const Car = mongoose.model('cars', CarSchema);



module.exports = Car;