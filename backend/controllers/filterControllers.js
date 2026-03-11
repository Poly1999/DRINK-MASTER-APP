const Drink = require('../models/Drink');
const Ingredient = require('../models/Ingredient');

// get categories

const getCategories = async (req, res) => {
  try {
    const categories = await Drink.distinct('category');
    res.status(200).json({ categories: categories.sort() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get ingredients

const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({}, 'title ingredientThumb');
    res.status(200).json({ ingredients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get glasses

const getGlasses = async (req, res) => {
  try {
    const glasses = await Drink.distinct('glass');
    res.status(200).json({ glasses: glasses.sort() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, getIngredients, getGlasses };
