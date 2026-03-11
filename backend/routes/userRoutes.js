const express = require('express');
const router = express.Router();
const {
  getCurrentUser,
  updateUser,
  subscribe,
} = require('../controllers/userControllers');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

router.get('/current', authenticate, getCurrentUser);
router.patch('/update', authenticate, upload.single('avatar'), updateUser);
router.post('/subscribe', authenticate, subscribe);

module.exports = router;
