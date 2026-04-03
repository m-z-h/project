const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank-transfer', 'credit-card', 'paypal', 'other'],
    default: 'bank-transfer',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  reference: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);
