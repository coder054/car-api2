const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const Port = require('../models/port');


router.get('/test', (req, res, next) => {
  Car.find({})
    .then((data) => res.send(data))
})

// return cars, 
router.get('/cars', (req, res, next) => {

  // if query string is not provided, return ''
  var country = req.query.country || '';

  var port = req.query.port || '';
  var keyword = req.query.keyword || '';

  const target = Port.findOne({ name: port, country: country });
  var cars;

  if (!keyword) {
    // if not searching, return all cars
    cars = Car.find({})
  } else {
    // if user is searching, return cars that match with keyword
    cars = Car.find({ $text: { $search: keyword } })
  }

  // wait for both cars and target query complete
  Promise.all([target, cars])
    .then(result => {
      // result[0] is response of target query, result[1] is response of cars query
      // when result[0] is null that mean user has not been selected a country and port yet, we not going to caculate the price, just return the data
      if (!result[0]) {
        res.send(result);
      } else {
        // user select a country and port, we caculate the price for that target
        const FreightPerM3 = result[0].FreightPerM3;
        var x = result[1].map((val, key) => {
          var finalPrice = FreightPerM3 * val.Volume + val.FOB;
          return {
            "Ref": val.Ref,
            "make": val.make,
            "model": val.model,
            "FOB": val.FOB,
            "Volume": val.Volume,
            "finalPrice": finalPrice
          }
        })
        result[1] = x
        res.send(result)
      }
    })
});


// return a car with specific id

router.get('/cars/:id', async (req, res, next) => {
  try {
    let car = await Car.findById({ _id: req.params.id })
    res.send(car)
  } catch (error) {
    next(error)
  }
})



// add a new car to the db
router.post('/cars', (req, res, next) => {
  let errors = [];
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      if (!req.body[key]) {
        errors.push(key)
      }
    }
  }

  if (errors.length >= 1) {
    res.send("Please provide enough info")
    return;
  }

  Car.create(req.body).then(car => {
    res.send(car);
  }).catch(next);
});

// update a car in the db
router.patch('/cars/:id', (req, res, next) => {
  Car.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((car) => Car.findOne({ _id: req.params.id })) // car will be the car before update, so we need to find the updated car and send to user
    .then(updatedCar => res.send(updatedCar))
    .catch(next);
  // try {
  //   let car = await Car.findByIdAndUpdate({ _id: req.params.id }, req.body)
  //   let updatedCar = await Car.findOne({ _id: req.params.id })
  //   res.send(updatedCar)
  // } catch (error) {
  //   next(error)
  // }
});

// delete a car from the db
router.delete('/cars/:id', async (req, res, next) => {
  try {
    let car = await Car.findByIdAndRemove({ _id: req.params.id })
    res.send(car)
  } catch (error) {
    next(error)
  }
});


// return all countries (distinct)
router.get('/countries', async (req, res, next) => {
  try {
    let countries = await Port.find({}).distinct('country')
    res.send(countries);
  } catch (error) {
    next(error)
  }
})


// return ports belong to a specific country
router.get('/portByCountry/:country', async (req, res, next) => {
  var country = req.params.country;
  try {
    let ports = await Port.find({ country: country })
    res.send(ports)
  } catch (error) {
    next(error)
  }
})


// get all car sorted by model DESC
router.get('/cars-desc', async (req, res, next) => {
  try {
    let cars = await Car.find({}).sort({ model: -1 })
    res.send(cars)
  } catch (error) {
    next(error)
  }

})

module.exports = router;