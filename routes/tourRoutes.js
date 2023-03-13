const fs = require('fs');
const express = require('express');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    reqAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

//to get parameters
const getTour = (req, res) => {
  const tour = tours.find((e) => e.id == req.params.id);

  if (req.params.id > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'imvalid ID',
    });

  res.status(200).json({
    status: 'sucess',
    data: {
      tour: tour,
    },
  });
};

const updateTours = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      tour: 'updated',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

//To create new post
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) res.status(404);
      res.status(201).json({
        status: 'sucess',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').delete(deleteTour).get(getTour).patch(updateTours);

module.exports = router;
