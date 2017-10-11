const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const Port = require('../models/port');


router.get('/test', function (req, res, next) {
  Car.find({})
    .then((data) => res.send(data))
})

// return cars, 
router.get('/cars', function (req, res, next) {

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
    .then((result) => {



      if (!result[0]) {
        res.send(result);
      } else {
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
router.get('/cars/:id', function (req, res, next) {
  Car.findById({ _id: req.params.id }).then(function () {
    Car.findOne({ _id: req.params.id }).then(function (car) {
      res.send(car);
    });
  }).catch(next);
});

// add a new car to the db
router.post('/cars', function (req, res, next) {
  Car.create(req.body).then(function (car) {
    res.send(car);
  }).catch(next);
});

// update a car in the db
router.patch('/cars/:id', function (req, res, next) {
  Car.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Car.findOne({ _id: req.params.id }).then(function (car) {
      res.send(car);
    });
  }).catch(next);
});

// delete a car from the db
router.delete('/cars/:id', function (req, res, next) {
  Car.findByIdAndRemove({ _id: req.params.id }).then(function (car) {
    res.send(car);
  }).catch(next);
});



// return all countries (distinct)
router.get('/countries', function (req, res, next) {
  Port.find({}).distinct('country')
    .then((countries) => {
      res.send(countries);
    })
})



// return ports belong to a specific country
router.get('/portByCountry/:country', function (req, res, next) {
  var country = req.params.country;
  Port.find({ country: country })
    .then(function (result) {
      res.send(result)
    })
    .catch(next)
})


// get all car sorted by model DESC
router.get('/cars-desc', function (req, res, next) {
  cars = Car.find({}).sort({ model: -1 })
    .then(resp => res.send(resp))

})


module.exports = router;