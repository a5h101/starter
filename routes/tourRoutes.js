const express = require('express');
const router = express.Router();
const {
  getAllTours,
  createTour,
  deleteTour,
  getTour,
  updateTours,
} = require('./../controller/toursController');

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').delete(deleteTour).get(getTour).patch(updateTours);

module.exports = router;
