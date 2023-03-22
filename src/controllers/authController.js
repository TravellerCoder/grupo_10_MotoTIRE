const path = require('path');
const fs = require('fs');
const { create } = require('domain');
const models = require('../database/models');
const User = models.User;
const { Op } = require('sequelize');



// Express-validator
const { validationResult } = require('express-validator');

// BCRYPT para hashear contraseñas
const bcrypt = require('bcryptjs');

const guestMidleware = require('../middlewares/users/guestMiddleware')




const authController = {


    renderRegister: (req, res) => {
        
        res.render(path.resolve('src/views/users/register'));
    },

    renderLogin: (req, res) => {
        
        res.render(path.resolve('src/views/users/login'));
    },

    createUser: async (req, res) => {
        const validationErrors = validationResult(req);
        ///Revision de errores en el formulario de registro
        if (validationErrors.errors.length > 0) {
            return res.render(path.resolve('src/views/users/register'), {
                errors: validationErrors.mapped(),
                oldData: req.body
            })
        }
        /////////////////////////////Busqueda de email registrado en base de datos
        let userInDataBase = await User.findOne({
            where: { email: req.body.email },
        });
        if (userInDataBase) {
            return res.render(path.resolve('src/views/users/register'), {
                errors: {
                    email: {
                        msg: 'Este Email ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }

        

        let userToCreate = {
            ...req.body,
            userPassword: bcrypt.hashSync(req.body.userPassword, 10),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10)
        };
        /////////////////////////////Creacion de usuario

        const usersData = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            adress: req.body.adress,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode,
            phone: req.body.phone,
            userPassword: bcrypt.hashSync(req.body.userPassword, 10),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10)
        }

        console.log(userToCreate)
        let userCreated = User.create(usersData)
            .then(user => {
                res.redirect('/ingresar');
            })
    },



    loginProcess: async (req, res) => {
        
        const userToLogIn = await User.findOne({
            where: { email: req.body.loginEmail }
        });
        if (userToLogIn) {
            const passwordYes = bcrypt.compareSync(req.body.loginPassword, userToLogIn.userPassword);
            if (passwordYes) {
                delete userToLogIn.userPassword;
                delete userToLogIn.confirmPassword 
                
                req.session.userLogged = userToLogIn


                if (req.body.remember) {
                    res.cookie("userEmail", req.body.userEmail, { maxAge: 1000 * 60 * 10 });
                }
                
                return res.redirect('/perfil')



            }
            
            return res.render(path.resolve('src/views/users/login'), {
                errors: {
                    loginEmail: {
                        msg: 'Los datos ingresados son incorrectos'
                    }
                },
                oldData: req.body
            })
        }
    },

    userProfile: (req, res) => {
        
        
        return res.render(path.resolve('src/views/users/user'), {
            userin: req.session.userLogged
        })
    },

    userEdit: async (req, res) => {
        const usersData = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            adress: req.body.adress,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode,
            phone: req.body.phone,
            
        }
        let userUpDated = User.update(usersData, {
            where: {
                user_id: req.params.user_id
            }
        })
            .then(user => {
                res.redirect('/perfil');
            })
    },


    logOut: (req, res) => {
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/')
    }
}

module.exports = authController