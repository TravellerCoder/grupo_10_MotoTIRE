const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { body } = require('express-validator');
const db = require('../database/models')

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

// CREAMOS VALIDACIONES DE CAMPOS DEL FOMULARIO DE CREACION/MODIFICACION DE PRODUCTO
const validationCreateProductForm = [
    body('brand').isLength({min:2}).withMessage('El nombre de la marca es muy corto'),
    body('description').isLength({min:20}).withMessage('Una descripcion completa ayuda a vender tu producto mas rapido!'),
    body('img').custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jepg', '.gif'];

        if (!file){
            throw new Error('Tenes que subir una imagen del producto')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las imagenes tienen que ser en formato .jpg, .png, .jepg, .gif' )
            }
        }
    })
]

-////////////////////////////////////////////
router.get('/busqueda', productsController.searching)
router.post('/busqueda', productsController.searched)

router.get('/detalle-producto/:id', productsController.renderProductsDetail);

router.get('/mis-compras', productsController.renderProductsCart);

router.get('/administrar-producto', productsController.renderAdminProduct);

router.get('/lista-productos', productsController.renderShowProducts);

// Creación de producto
router.get('/crear-producto', productsController.renderCreateProduct);
router.post('/guardar-producto',upload.single('img'), productsController.storeProduct);

//Edición de producto
router.get('/modificar-producto/:id', productsController.renderEditProduct);
router.put('/modificar-producto/:id',upload.single('img'), productsController.updateProduct);

// Eliminar producto
router.get('/eliminar-producto/:id', productsController.renderDeleteForm)
router.delete('/eliminar-producto/:id', productsController.deleteProduct); 



module.exports = router;