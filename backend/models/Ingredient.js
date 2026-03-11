const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema(
  {
    title: { type: String },
    calories: { type: String },
    category: { type: String },
    alcoholic: { type: Boolean },
    description: { type: String },
    ingredientThumb: { type: String },
    type: { type: String },
    abv: { type: String },
  },
  { timestamps: true },
);

module.exports = model('Ingredient', ingredientSchema);
