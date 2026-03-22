const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');
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
router.get('/own', authenticate, getOwnDrinks);
router.get('/favorite', authenticate, getFavorites);
router.post('/own/add', authenticate, upload.single('drinkThumb'), getOwnDrink);
router.delete('/own/remove/:id', authenticate, removeOwnDrink);
router.post('/favorite/add/:id', authenticate, addFavorite);
router.delete('/favorite/remove/:id', authenticate, removeFavorite);
router.get('/:id', authenticate, getDrinkById);

module.exports = router;
