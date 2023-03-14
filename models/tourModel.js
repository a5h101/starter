const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is compulsory'],
  },
  raiting: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
