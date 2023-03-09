const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const authController = require('../controllers/authController');
const models = require('../database/models');
const User = models.User;

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/img'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

// EXPRESS-VALIDATOR
const { body } = require('express-validator');
const guestMidleware = require('../middlewares/guestMiddleware');
const authMidleware = require('../middlewares/authMidleware');

// CREAMOS CONSTANTE CON ARRAY DE VALIDACIONES DE FORMULARIO DE REGISTER.EJS

const validationRegisterForm = [
    body('name').notEmpty().withMessage('El campo nombre es obligatorio').bail()
                .isLength({min: 2 }).withMessage('El nombre es muy corto.'),
    body('email').notEmpty().withMessage('El campo email es obligatorio').bail()
                .isEmail().withMessage('Ingrese un mail valido; ejemplo@ejemplo.com'),
    body('userPassword').notEmpty().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('confirmPassword').notEmpty().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]

const validationsLogIn = [
    body('loginEmail').notEmpty().withMessage('Ingresa el mail').bail()
                        .isEmail().withMessage('Email invalido'),
    body('loginPassword').notEmpty().withMessage('Tenes que ingresar tu contraseña.')
    
]


/////////////////ROUTERS///////////////////////
// Creación de usuario
router.get('/registrarse',guestMidleware, authController.renderRegister);
router.post('/guardar-usuario', validationRegisterForm, authController.createUser);

// Login de usuario
router.get('/ingresar',guestMidleware, authController.renderLogin);
router.post('/login', validationsLogIn, authController.loginProcess);

//Perfil del usuario
router.get('/perfil', authMidleware, authController.userProfile);

//Modificacion de usuario
router.get('/modificar-usuario',guestMidleware, authController.renderRegister);
router.post('/guardar-usuario', validationRegisterForm, authController.createUser);

//Log out del usuario
router.get('/salir', authController.logOut)

module.exports = router;