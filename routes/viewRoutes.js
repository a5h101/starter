const express = require('express');
const router = express.Router();
const { getOverview, getTour } = require('../controller/viewsController');

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Akash',
//   }); //express will render this req with name base
// });

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

module.exports = router;
