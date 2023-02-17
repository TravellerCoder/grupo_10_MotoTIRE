const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { body } = require('express-validator');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve('public/img'))
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});
const upload = multer({ storage:storage });
const cpUpload = upload.fields([{ name: 'img', maxCount: 1 }, { name: 'subImgs', maxCount: 2 }]);

////////////////////////////////////////////

router.get('/detalle-producto/:id', productsController.renderProductsDetail);

router.get('/mis-compras', productsController.renderProductsCart);

router.get('/administrar-producto', productsController.renderAdminProduct);

router.get('/lista-productos', productsController.renderShowProducts);

// Creación de producto
router.get('/crear-producto', productsController.renderCreateProduct);
router.post('/guardar-producto', cpUpload, productsController.storeProduct);

// Edición de producto
router.get('/modificar-producto/:id', productsController.renderEditProduct);
router.put('/modificar-producto/:id', cpUpload, productsController.updateProduct);

// Eliminar producto
router.get('/eliminar-producto/:id', productsController.renderDeleteForm)
router.delete('/eliminar-producto/:id', productsController.deleteProduct);



module.exports = router;