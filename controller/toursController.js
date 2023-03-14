const fs = require('fs');
const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'sucess',
    // results: tours.length,
    // reqAt: req.requestTime,
    // data: {
    //   tours: tours,
    // },
  });
};

//to get parameters
exports.getTour = (req, res) => {
  // const tour = tours.find((e) => e.id == req.params.id);
  // res.status(200).json({
  //   status: 'sucess',
  //   data: {
  //     tour: tour,
  //   },
  // });
};

exports.updateTours = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: 'updated',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

//To check the body of post request
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: `missing ${!req.body.name ? 'name' : ''} ${
        !req.body.name && !req.body.price ? 'and' : ''
      } ${!req.body.price ? 'price' : ''} `,
    });
  }
  next();
};
//To create new post
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'sucess',
    // data: {
    //   tours: newTour,
    // },
  });
};
