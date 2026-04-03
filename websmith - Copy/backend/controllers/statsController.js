const Project = require('../models/Project');
const Client = require('../models/Client');
const Task = require('../models/Task');
const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');
const { protect } = require('../middleware/auth');

// @desc    Get dashboard stats
// @route   GET /api/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    // Get counts
    const projectsCount = await Project.countDocuments();
    const clientsCount = await Client.countDocuments();
    const tasksCount = await Task.countDocuments({ status: { $ne: 'completed' } });
    
    // Get total revenue from paid invoices
    const paidInvoices = await Invoice.find({ status: 'paid' });
    const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
    
    res.json({
      success: true,
      data: {
        projects: projectsCount,
        clients: clientsCount,
        tasks: tasksCount,
        revenue: totalRevenue,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = { getStats };
