const express = require('express');
const {
  getRecipes,
  getRecipe,
  getRandomRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipes');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getRecipes)
  .post(protect, authorize('admin', 'user'), createRecipe);

router.route('/random').get(getRandomRecipe);

router
  .route('/:id')
  .get(getRecipe)
  .put(protect, authorize('admin', 'user'), updateRecipe)
  .delete(protect, authorize('admin', 'user'), deleteRecipe);

module.exports = router;
