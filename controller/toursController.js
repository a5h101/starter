const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
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
exports.getTour = (req, res) => {
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

exports.updateTours = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
