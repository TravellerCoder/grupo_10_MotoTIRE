const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const authController = require('../controllers/authController');

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
const cpUpload = upload.fields([{ name: 'user_logo', maxCount: 1 }]);

const {
    check,
    validationResult,
    body
} = require('express-validator'); // EXPRESS-VALIDATOR

// CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
const usersFilePath = path.resolve('./src/data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

////////////////////////////////////////


// Login de usuario
router.get('/ingresar', authController.renderLogin);
router.post('/login', [
    check('loginEmail').isEmail().withMessage('Email invalido'),
    check('loginPassword').isLength({ min: 4}).withMessage('La contraseña debe tener al menos 4 caracteres.'),
], authController.login);

// Creación de usuario
router.get('/registrarse', authController.renderRegister);
router.post('/crear-usuario', [
check('name').isLength({ min: 1}).withMessage('Todos los campos son obligatorios.'),
check('lastName').isLength({ min: 1}).withMessage('Todos los campos son obligatorios.'),
check('address').isLength({ min: 1}).withMessage('Todos los campos son obligatorios.'),
check('city').isLength({ min: 1}).withMessage('Todos los campos son obligatorios.'),
check('country').isLength({ min: 1}).withMessage('Todos los campos son obligatorios.'),
check('email').isEmail().withMessage('Email invalido'),
check('postalcode').isLength().withMessage('Codigo postal admite solo números.'),
check('phone').isNumeric().withMessage('Telefono admite solo números.'),
check('userPassword').isLength({ min: 4}).withMessage('La contraseña debe tener al menos 4 caracteres.'),
check('confirmPassword').isLength({ min: 4}).withMessage('La contraseña debe tener al menos 4 caracteres.'),
], cpUpload,
authController.createUser);

module.exports = router;