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

// CREAMOS CONSTANTE CON ARRAY DE VALIDACIONES DE FORMULARIO DE REGISTER.EJS

const validationRegisterForm = [
    body('name').isLength({ min: 2 }).withMessage('El nombre es muy corto.'),
    body('email').isEmail().withMessage('Ingrese un mail valido; ejemplo@ejemplo.com'),
    body('userPassword').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.'),
    body('confirmPassword').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.')
]

/////////////////ROUTERS///////////////////////


// Login de usuario
router.get('/ingresar', authController.renderLogin);
router.post('/login', [
    body('loginEmail').isEmail().withMessage('Email invalido'),
    body('loginPassword').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.'),
], authController.login);

// Creación de usuario
router.get('/registrarse', authController.renderRegister);
router.post('/guardar-usuario', validationRegisterForm, authController.createUser);

module.exports = router;