const Tour = require('../models/tourModel');

//exports
exports.getOverview = async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.params.slug }).populate({
      feilds: 'reviews ratings user',
    });
    res.status(200).render('tour'),
      {
        title: 'The forest Hiker Tour',
        tour,
      };
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
