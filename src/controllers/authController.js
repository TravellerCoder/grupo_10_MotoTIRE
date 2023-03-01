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
//const { validationResult } = require('express-validator');

// BCRYPT para hashear contraseñas
const bcrypt = require('bcrypt');

let errors = "";
let emailError = "";

const authController = {

renderRegister : (req, res) => {
    User.findAll()
        .then(function(User){
            return res.render(path.resolve ('src/views/users/register'), {User});
        })
    
},

renderLogin : (req, res) => {
    const viewData = {errors}
    return res.render(path.resolve('src/views/users/login'), viewData);
},

createUser : async (req, res) => {
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
    
    console.log(usersData)
    User.create(usersData)
        .then(user => {
            res.redirect('/');})
            .catch(error => res.send(error))
            console.log(req.body)
    //console.log(re)
},

login : (req,res) => {
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    
    const adminData = users.find(users => users.email == "admin@mototire.com");
    const adminPassword = adminData.userPassword;
    const searchUser = users.find(users => users.email == loginEmail)

    let userFinded = {}

    // BUSCAR USUARIO
    if(searchUser == undefined){
        errors = "Error: Usuario inexistente."
        const viewData = {errors}
        return res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'), viewData);

    }else{
        userFinded = searchUser;
    }

    if(req.body.remember){
        res.cookie('email',userFinded.email,{maxAge: 1000 * 60 * 60 * 24})
        req.session.email = userFinded.email;
        req.session.role = userFinded.role;
        console.log(req.session)

    }

        // COMPARAR USUARIO SI ES ADMIN Y CONTRASEÑA
    if(bcrypt.compareSync(loginPassword, adminPassword) && userFinded.email == "admin@mototire.com"){
        const viewData = {adminData}
        res.render(path.resolve(__dirname, '..', 'views', 'products', 'adminProduct'), viewData);

        // COMPARAR CONTRASEÑA Y USUARIO DEL MISMO ID
    }else if(bcrypt.compareSync(loginPassword, userFinded.userPassword) && userFinded.email == loginEmail){
        const inSaleProducts = products.filter(product => product.category == 'in-sale');
        const viewData = {inSaleProducts, userFinded}
        res.render(path.resolve(__dirname, '..', 'views', 'index'), viewData);
    }

        // MOSTRAR ERRORES DE FORMULARIO SI LOS HAY
    let err = validationResult(req);
    if(!err.isEmpty()) {
        const errors = new Error(err.array().map(el => el['msg']).toString());
        const viewData = {errors}
        return res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'), viewData);
    }

        // COMPARAR CONTRASEÑA
    if(bcrypt.compareSync(loginPassword, userFinded.userPassword) && userFinded.email == loginEmail){
        const inSaleProducts = products.filter(product => product.category == 'in-sale');
        const viewData = {inSaleProducts, userFinded}
        return res.render(path.resolve(__dirname, '..', 'views', 'index'), viewData);

    }else if(bcrypt.compareSync(loginPassword, adminPassword) && userFinded.email == "admin@mototire.com"){
    const viewData = {adminData}
    return res.render(path.resolve(__dirname, '..', 'views', 'products', 'adminProduct'), viewData);

    }else{
        errors = "Error: Contraseña incorrecta."
        const viewData = {errors}
        return res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'), viewData);
    };

}
}

module.exports = authController;