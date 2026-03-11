const express = require('express');
const router = express.Router();
const {
  getCategories,
  getIngredients,
  getGlasses,
} = require('../controllers/filterControllers');
const authenticate = require('../middlewares/authenticate');

router.get('/categories', authenticate, getCategories);
router.get('/ingredients', authenticate, getIngredients);
router.get('/glasses', authenticate, getGlasses);

module.exports = router;
