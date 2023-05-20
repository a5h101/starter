const express = require('express');
const router = express.Router();
const {
  // checkId,
  getAllTours,
  createTour,
  deleteTour,
  getTour,
  updateTours,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('./../controller/toursController');

//Special Routes
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

// router.param('id', checkId);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').delete(deleteTour).get(getTour).patch(updateTours);

module.exports = router;
