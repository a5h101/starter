const morgan = require('morgan');
const express = require('express');
const app = express();
const port = 8000;

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('hello from the middleware🤣');
  req.requestTime = new Date().toISOString();
  next();
});

//Mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//server
app.listen(port, () => {
  console.log(`listening port ${port}...`);
});
