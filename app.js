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

const createUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
//Tour Routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').delete(deleteTour).get(getTour).patch(updateTours);

userRouter.route('/').get(getAllUsers).post(createUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//Mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//server
app.listen(port, () => {
  console.log(`listening port ${port}...`);
});
