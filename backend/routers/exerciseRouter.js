const router = require('express').Router();

const exerciseController = require('../controllers/exerciseController');

router.get('/', exerciseController.getAllExercises);

router.post('/add', exerciseController.createExercise);

router.patch('/archive/:id', exerciseController.archiveExercise);

router
  .route('/:id')
  .get(exerciseController.getExercise)
  .patch(exerciseController.updateExercise)
  .delete(exerciseController.deleteExercise);

module.exports = router;
