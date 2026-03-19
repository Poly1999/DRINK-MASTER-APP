const Drink = require('../models/Drink');

// check user is over 18

const isAdult = birthday => {
  const today = new Date();
  const birthDate = new Date(birthday);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 21;
};

// main page - coctails by categories

const getMainPage = async (req, res) => {
  try {
    const adult = isAdult(req.user.birthday);
    const alcoholicFilter = adult ? {} : { alcoholic: 'Non alcoholic' };

    const featuredIds = {
      'Ordinary Drink': [
        '639b6de9ff77d221f190c67e',
        '639b6de9ff77d221f190c5f0',
        '639b6de9ff77d221f190c69c',

        ,
      ],
      Cocktail: [
        '639b6de9ff77d221f190c685',
        '639b6de9ff77d221f190c576',
        '639b6de9ff77d221f190c552',
      ],
      Shake: [
        '639b6de9ff77d221f190c628',
        '639b6de9ff77d221f190c632',
        '639b6de9ff77d221f190c563',
      ],
      'Other/Unknown': [
        '639b6de9ff77d221f190c68a',
        '639b6de9ff77d221f190c566',
        '639b6de9ff77d221f190c54c',
      ],
    };

    const categories = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown'];

    const drinks = await Promise.all(
      categories.map(async category => {
        const ids = featuredIds[category];
        let items;

        if (ids.length > 0) {
          items = await Drink.find({
            _id: { $in: ids },
            ...alcoholicFilter,
          });
        } else {
          items = await Drink.find({ category, ...alcoholicFilter })
            .sort({ createdAt: -1 })
            .limit(3);
        }

        return { category, drinks: items };
      }),
    );

    res.status(200).json({ drinks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// popular coctails

const getPopular = async (req, res) => {
  try {
    const adult = isAdult(req.user.birthday);
    const alcoholicFilter = adult ? {} : { alcoholic: ' Non alcoholic' };

    const drinks = await Drink.find(alcoholicFilter)
      .sort('-favoritesCount')
      .limit(4);

    res.status(200).json({ drinks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search coctails

const searchDrinks = async (req, res) => {
  try {
    const { keyword, category, ingredient, page = 1, limit = 9 } = req.query;
    const adult = isAdult(req.user.birthday);
    const filter = adult ? {} : { alcoholic: 'Non alcoholic' };

    if (keyword) filter.drink = { $regex: keyword, $options: 'i' };
    if (category) filter.category = category;
    if (ingredient)
      filter['ingredients.title'] = { $regex: ingredient, $options: 'i' };

    const skip = (page - 1) * limit;
    const total = await Drink.countDocuments(filter);
    const drinks = await Drink.find(filter).skip(skip).limit(Number(limit));

    res.status(200).json({
      drinks,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// find one drink by id

const getDrinkById = async (req, res) => {
  try {
    const { id } = req.params;
    const drink = await Drink.findById(id);

    if (!drink) {
      return res.status(404).json({ message: 'Drink not found' });
    }

    res.status(200).json({ drink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add own coctail

const getOwnDrink = async (req, res) => {
  try {
    const adult = isAdult(req.use.birthday);
    const { alcoholic } = req.body;

    if (!adult && alcoholic !== 'Non alcoholic') {
      return res
        .status(403)
        .json({ message: 'You must be 21+ to add alcoholic drinks' });
    }

    const drink = await Drink.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({ drink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// remove own coctail

const removeOwnDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const drink = await Drink.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!drink) {
      return res.status(404).json({ message: 'Drink not found' });
    }

    res.status(200).json({ message: 'Drink deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get own coctails

const getOwnDrinks = async (req, res) => {
  try {
    const { page = 1, limit = 9 } = req.body;
    const skip = (page - 1) * limit;

    const total = await Drink.countDocuments({ owner: req.user._id });
    const drinks = await Drink.find({ owner: req.user._id })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      drinks,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
};

// add to favorite

const addFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (user.favorites?.includes(id)) {
      return res.status(409).json({ message: 'Drink already in favorites' });
    }

    await user.updateOne({ $push: { favorites: id } });
    await Drink.findByIdAndUpdate(id, { $inc: { favoritesCount: 1 } });

    res.status(200).json({ message: 'Drink added to favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete from favorite

const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await req.user.updateOne({ $puu: { favorites: id } });
    await Drink.findByIdAndUpdate(id, { $inc: { favoritesCount: -1 } });

    res.status(200).json({ message: 'Drink removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get favorite coctails

const getFavorites = async (req, res) => {
  try {
    const { pahe = 1, limit = 9 } = req.body;
    const skip = (page - 1) * limit;

    const user = req.user;
    const total = user.favorites?.length || 0;
    const drinks = await Drink.find({ _id: { $in: user.favorites } })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      drinks,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMainPage,
  getPopular,
  searchDrinks,
  getDrinkById,
  getOwnDrink,
  removeOwnDrink,
  getOwnDrinks,
  addFavorite,
  removeFavorite,
  getFavorites,
};
