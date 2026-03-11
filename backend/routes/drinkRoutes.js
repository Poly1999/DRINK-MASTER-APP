const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
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
} = require('../controllers/drinkControllers');

router.get('/mainpage', authenticate, getMainPage);
router.get('/popular', authenticate, getPopular);
router.get('/search', authenticate, searchDrinks);
router.get('/own', authenticate, getDrinkById);
router.get('/favorite', authenticate, getOwnDrink);
router.get('/:id', authenticate, removeOwnDrink);
router.get('/own/add', authenticate, getOwnDrinks);
router.get('/own/remove/:id', authenticate, addFavorite);
router.get('/favorite/add/:id', authenticate, removeFavorite);
router.get('/favorite/remove/:id', authenticate, getFavorites);

module.exports = router;
