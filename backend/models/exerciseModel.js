const mongoose = require('mongoose');

const excerciseSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide your username'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    duration: {
      type: Number,
      required: [true, 'Please Provide a duration'],
    },
    archive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model('Exercise', excerciseSchema);
module.exports = Exercise;
