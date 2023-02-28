const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const authController = require('../controllers/authController');
const models= require('../database/models');
const User = models.User;
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
         // EXPRESS-VALIDATOR
const {
    check,
    validationResult,
    body
} = require('express-validator');

/**CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
const usersFilePath = path.resolve('./src/data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));*/


// CREAMOS CONSTANTE CON ARRAY DE VALIDACIONES DE FORMULARIO DE REGISTER.EJS

const validationRegisterForm = [
    check('name').isLength({ min: 2}).withMessage('El nombre es muy corto.'),
check('email').isEmail().withMessage('Ingrese un mail valido; ejemplo@ejemplo.com'),
check('userPassword').isLength({ min: 8}).withMessage('La contraseña debe tener al menos 4 caracteres.'),
check('confirmPassword').isLength({ min: 4}).withMessage('La contraseña debe tener al menos 4 caracteres.')
]

////////////////////////////////////////


// Login de usuario
router.get('/ingresar', authController.renderLogin);
router.post('/login', [
    check('loginEmail').isEmail().withMessage('Email invalido'),
    check('loginPassword').isLength({ min: 4}).withMessage('La contraseña debe tener al menos 4 caracteres.'),
], authController.login);

// Creación de usuario
router.get('/registrarse', authController.renderRegister);
router.post('/crear-usuario', validationRegisterForm, cpUpload,authController.createUser);

module.exports = router;