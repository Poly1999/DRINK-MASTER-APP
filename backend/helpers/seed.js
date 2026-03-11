require('dotenv').config();
const mongoose = require('mongoose');
const Drink = require('../models/Drink');
const Ingredient = require('../models/Ingredient');
const recipes = require('../data/recipes.json');
const ingredients = require('../data/ingredients.json');

// Конвертує { $oid: '...' } в звичайний ObjectId
const convertIds = arr => {
  return arr.map(item => {
    const converted = { ...item };
    if (item._id?.$oid)
      converted._id = new mongoose.Types.ObjectId(item._id.$oid);
    if (item.ingredients) {
      converted.ingredients = item.ingredients.map(ing => {
        const newIng = { ...ing };
        if (ing.ingredientId?.$oid)
          newIng.ingredientId = new mongoose.Types.ObjectId(
            ing.ingredientId.$oid,
          );
        return newIng;
      });
    }
    return converted;
  });
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Ingredient.deleteMany({});
    await Drink.deleteMany({});
    console.log('Collections cleared');

    const convertedIngredients = convertIds(ingredients);
    await Ingredient.insertMany(convertedIngredients);
    console.log(`Ingredients added: ${ingredients.length}`);

    const convertedRecipes = convertIds(recipes);
    await Drink.insertMany(convertedRecipes);
    console.log(`Drinks added: ${recipes.length}`);

    console.log('Seed completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
