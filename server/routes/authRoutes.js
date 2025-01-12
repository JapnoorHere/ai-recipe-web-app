const express = require('express');
const {signup,signin} = require('../controllers/authController');

const router = express.Router();

router.post('/signup',signup);

// Login a user
router.post('/signin',signin);

module.exports = router;
