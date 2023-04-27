const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const { dirname } = require('path');
dotenv.config({ path: './config.env' }); //should be above app file
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, //optional
  })
  .then((con) => console.log('DB connction stablished'))
  .catch((err) => console.log(err));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

console.log(tours);
//add data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data sucessfully added');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from db

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data sucessfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
