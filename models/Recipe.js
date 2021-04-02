const mongoose = require('mongoose');
const slugify = require('slugify');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    lowercase: true
  },
  slug: String,
  instructions: {
    type: [String]
  },
  ingredients: {
    type: [String]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  }
});

// RecipeSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

module.exports = mongoose.model('Recipe', RecipeSchema);
