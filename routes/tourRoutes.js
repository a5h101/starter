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
} = require('./../controller/toursController');

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

// router.param('id', checkId);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').delete(deleteTour).get(getTour).patch(updateTours);

module.exports = router;
