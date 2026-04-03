const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');
const { protect } = require('../middleware/auth');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate('invoice', 'invoiceNumber amount')
      .populate('client', 'name company')
      .populate('processedBy', 'name email');
    
    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('invoice', 'invoiceNumber amount total')
      .populate('client', 'name company email')
      .populate('processedBy', 'name email');
    
    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Payment not found' 
      });
    }
    
    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Create payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create({
      ...req.body,
      processedBy: req.user._id,
    });
    
    // Update invoice status if payment is completed
    if (payment.status === 'completed') {
      await Invoice.findByIdAndUpdate(payment.invoice, {
        status: 'paid',
        paidDate: payment.paymentDate,
      });
    }
    
    const populatedPayment = await Payment.findById(payment._id)
      .populate('invoice', 'invoiceNumber amount')
      .populate('client', 'name company')
      .populate('processedBy', 'name email');
    
    res.status(201).json({
      success: true,
      data: populatedPayment,
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Update payment
// @route   PUT /api/payments/:id
// @access  Private
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('invoice', 'invoiceNumber amount')
      .populate('client', 'name company')
      .populate('processedBy', 'name email');
    
    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Payment not found' 
      });
    }
    
    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Delete payment
// @route   DELETE /api/payments/:id
// @access  Private
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Payment not found' 
      });
    }
    
    await payment.deleteOne();
    
    res.json({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    console.error('Delete payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };
