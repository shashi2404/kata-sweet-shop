const express = require('express');
const router = express.Router();

const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet
} = require('../controllers/sweetController');

const { protect, adminOnly } = require('../middleware/authMiddleware');
const { purchaseSweet, restockSweet } = require('../controllers/sweetController');


// routes
router.post('/', protect, adminOnly, createSweet);
router.get('/', protect, getAllSweets);
router.get('/search', protect, searchSweets);
router.put('/:id', protect, adminOnly, updateSweet);
router.delete('/:id', protect, adminOnly, deleteSweet);
router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, adminOnly, restockSweet);


module.exports = router;
