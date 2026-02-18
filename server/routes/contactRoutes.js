const express = require('express');
const { submitContact, getContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, getContacts); // Protect this route so only logged in users (admins) can see it

module.exports = router;
