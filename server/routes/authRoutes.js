const express = require('express');
const { registerUser, loginUser, logoutUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // Should be protected? Usually logout doesn't strictly need to be, but good practice.
router.get('/me', protect, getMe);

module.exports = router;
