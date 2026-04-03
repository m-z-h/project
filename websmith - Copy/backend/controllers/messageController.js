const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// @desc    Get all messages (for current user)
// @route   GET /api/messages
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { recipient: req.user._id }
      ]
    })
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar')
      .sort('-createdAt');
    
    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar');
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    
    // Check if user is sender or recipient
    if (
      message.sender._id.toString() !== req.user._id.toString() &&
      message.recipient._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to view this message' 
      });
    }
    
    // Mark as read if user is recipient
    if (
      message.recipient._id.toString() === req.user._id.toString() &&
      !message.isRead
    ) {
      message.isRead = true;
      message.readAt = new Date();
      await message.save();
    }
    
    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Create message
// @route   POST /api/messages
// @access  Private
exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create({
      ...req.body,
      sender: req.user._id,
    });
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar');
    
    res.status(201).json({
      success: true,
      data: populatedMessage,
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    
    // Check if user is sender or recipient
    if (
      message.sender.toString() !== req.user._id.toString() &&
      message.recipient.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this message' 
      });
    }
    
    await message.deleteOne();
    
    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = { getMessages, getMessageById, createMessage, deleteMessage };
