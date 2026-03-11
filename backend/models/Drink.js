const { Schema, model } = require('mongoose');

const drinkSchema = new Schema(
  {
    drink: { type: String },
    alcoholic: { type: String },
    category: { type: String },
    glass: { type: String },
    description: { type: String },
    instructions: { type: String },
    drinkThumb: { type: String },
    ingredients: [
      {
        title: { type: String },
        measure: { type: String },
        ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    favoritesCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = model('Drink', drinkSchema);
