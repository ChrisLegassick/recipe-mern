const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Recipe = require('../models/Recipe');

// @desc    Get all recipes
// @route   GET /api/v1/recipes
// @access  Public
exports.getRecipes = asyncHandler(async (req, res, next) => {
  // const recipes = await Recipe.find(req.query);

  const re = new RegExp(req.query.name, 'gi');

  const recipes = await Recipe.find({ name: { $regex: re } });

  res.status(200).json({
    success: true,
    count: recipes.length,
    data: recipes
  });
});

// @desc    Get single recipe by id
// @route   GET /api/v1/recipes/:id
// @access  Public
exports.getRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: recipe
  });
});

// @desc    Get random recipe
// @route   GET /api/v1/recipes/random
// @access  Public
exports.getRandomRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);

  res.status(200).json({
    success: true,
    data: recipe
  });
});

// @desc    Create new recipe
// @route   POST /api/v1/recipes
// @access  Private
exports.createRecipe = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    data: recipe
  });
});

// @desc    Update recipe
// @route   PUT /api/v1/recipes/:id
// @access  Private
exports.updateRecipe = asyncHandler(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }

  if (recipe.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this recipe`,
        401
      )
    );
  }

  recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: recipe
  });
});

// @desc    Delete recipe
// @route   DELETE /api/v1/recipes/:id
// @access  Private
exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }

  if (recipe.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this recipe`,
        401
      )
    );
  }

  recipe = await Recipe.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
