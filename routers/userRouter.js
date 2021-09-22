const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.post('/add', userController.createUser);

module.exports = router;
