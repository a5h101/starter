const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();

//Global middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
//Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//Mounting
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
