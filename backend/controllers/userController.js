const User = require('../models/userModel');
const catchError = require('../utils/catchError');
const AppError = require('../utils/appError');

exports.getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find().select('-__v');

  res.status(200).json({
    results: users.length,
    status: 'success',
    users,
  });
});

exports.createUser = catchError(async (req, res, next) => {
  const { username } = req.body;

  const findUser = await User.findOne({ username });

  console.log(findUser);

  if (findUser) return next(new AppError('Username already exists', 400));

  const newUser = await User.create({ username });

  res.status(201).json({
    status: 'success',
    newUser,
  });
});
