const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = express();
const port = 8000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('hello from the middleware🤣');
  req.requestTime = new Date().toISOString();
  next();
});

//route handlers

// To get all the tours
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

//Tour Routes
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.patch('/api/v1/tours/:id', updateTours);
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .delete(deleteTour)
  .get(getTour)
  .patch(updateTours);

//server
app.listen(port, () => {
  console.log(`listening port ${port}...`);
});
