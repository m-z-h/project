const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getUsers, getUserById, updateUser } = require('../controllers/userController');

router.get('/', protect, getUsers);
router.get('/me', protect, getUserById);
router.put('/:id', protect, updateUser);

module.exports = router;
