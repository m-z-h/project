const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getMessages, getMessageById, createMessage, deleteMessage } = require('../controllers/messageController');

router.get('/', protect, getMessages);
router.get('/:id', protect, getMessageById);
router.post('/', protect, createMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
