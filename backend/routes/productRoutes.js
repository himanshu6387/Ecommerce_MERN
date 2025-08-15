const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer'); // ⬅️ import multer middleware

// Public Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin Routes (Protected)
router.post('/', auth, isAdmin, upload.single('image'), createProduct); // ⬅️ handle file upload
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

module.exports = router;
