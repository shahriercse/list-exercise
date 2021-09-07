const Exercise = require('../models/exerciseModel');
const catchError = require('../utils/catchError');
const AppError = require('../utils/appError');

exports.getAllExercises = catchError(async (req, res, next) => {
  // const exercises = await Exercise.find({ archive: false });
  const exercises = await Exercise.find();

  if (exercises.length === 0)
    return next(new AppError('There is no exercise in the database', 400));

  res.status(200).json({
    result: exercises.length,
    status: 'success',
    exercises,
  });
});

exports.getExercise = catchError(async (req, res, next) => {
  const { id } = req.params;
  const exercise = await Exercise.findById({ _id: id });

  if (!exercise)
    return next(new AppError('There is no user with that id', 404));

  res.status(200).json({
    status: 'success',
    exercise,
  });
});

exports.createExercise = catchError(async (req, res, next) => {
  let { username, description, duration } = req.body;

  console.log(username, description, duration);

  const newExercise = await Exercise.create({
    username,
    description,
    duration,
  });

  res.status(201).json({
    status: 'success',
    newExercise,
  });
});

exports.deleteExercise = catchError(async (req, res, next) => {
  const id = req.params.id;

  const deleteEx = await Exercise.findByIdAndDelete({ _id: id });

  res.status(204).json({
    status: 'success',
    deleteEx,
  });
});

exports.updateExercise = catchError(async (req, res, next) => {
  const { id } = req.params;
  // let { username, description, duration, date } = req.body;

  const updateEx = await Exercise.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    updateEx,
  });
});

exports.archiveExercise = catchError(async (req, res, next) => {
  const { id } = req.params;

  const exercise = await Exercise.findById({ _id: id });

  const archives = await Exercise.findByIdAndUpdate(
    { _id: id },
    { archive: !exercise.archive },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    archives,
  });
});
