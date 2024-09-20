const { Router } = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, exportProductsToExcel } = require('../controllers/product.controller');
const  authenticate  = require('../middleware/auth.middleware');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);
router.get('/export/excel', authenticate, exportProductsToExcel);

module.exports = router;
