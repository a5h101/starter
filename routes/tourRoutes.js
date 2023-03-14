const express = require('express');
const router = express.Router();
const {
  // checkId,
  getAllTours,
  createTour,
  deleteTour,
  getTour,
  updateTours,
  checkBody,
} = require('./../controller/toursController');

// router.param('id', checkId);
router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').delete(deleteTour).get(getTour).patch(updateTours);

module.exports = router;
