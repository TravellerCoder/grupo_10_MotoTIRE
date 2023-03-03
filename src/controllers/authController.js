const path = require('path');
const fs = require('fs');
const { create } = require('domain');
const models = require('../database/models');
const User = models.User;
const { Op } = require('sequelize');

/**  CREAMOS LA CONSTANTE PRODUCTS PARA SU UTILIZACIÓN
const productsFilePath = path.resolve('./src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));*/

/**  CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
const usersFilePath = path.resolve('./src/data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));*/

// Express-validator
const { validationResult } = require('express-validator');

// BCRYPT para hashear contraseñas
//const bcrypt = require('bcrypt');

//let errors = "";
//let emailError = "";

const authController = {

    ////////////////Ingreso al formulario de registro/////////////////////////
    renderRegister: (req, res) => {
        res.render(path.resolve('src/views/users/register'));
    },
///////////////////Ingreso al formulario de logIn/////////////////////////////
    renderLogin: (req, res) => {
        res.render(path.resolve('src/views/users/login'));
    },
//////////////////Creacion de usuario//////////////////////
    createUser: async (req, res) => {
        const errors = validationResult(req);
                res.send(errors)
        if (!errors.isEmpty()) {
            const usersData = {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                adress: req.body.adress,
                city: req.body.city,
                country: req.body.country,
                postalCode: req.body.postalCode,
                phone: req.body.phone,
                userPassword: req.body.userPassword,
                confirmPassword: req.body.confirmPassword
            }
//console.log(usersData) // Lo usamos por si el body del formulario arroja algun error.
            User.create(usersData)
                .then(user => {
                    res.redirect('/ingresar');
                })
                .catch(errors => res.send(errors)) 
            } else {
                res.redirect('/crear-usuario',{errors : errors.err()})
            }
    },
//////////////// proceso de logeo de usuario registrado///////////////////////
        login: (req, res) => {
            res.render(path.resolve('src/views/index'))
        }
    }

module.exports = authController;