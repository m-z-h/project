const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');

router.get('/', protect, getProjects);
router.get('/:id', protect, getProjectById);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
