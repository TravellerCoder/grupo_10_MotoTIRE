const path = require('path');
const fs = require('fs');
const { create } = require('domain');

// CREAMOS LA CONSTANTE PRODUCTS PARA SU UTILIZACIÓN
const productsFilePath = path.resolve('./src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
const usersFilePath = path.resolve('./src/data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// Express-validator
const { validationResult } = require('express-validator');

// BCRYPT para hashear contraseñas
const bcrypt = require('bcrypt');

let errors = "";
let emailError = "";

const renderRegister = (req, res) => {
    errors = ""
    const viewData = {errors: errors};
    return res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'), viewData);
};

const renderLogin = (req, res) => {
    const viewData = {errors}
    return res.render(path.resolve(__dirname, '..', 'views', 'users', 'login'), viewData);
};

const createUser = (req, res) => {

        let err = validationResult(req);

        // VALIDACIONES - NO FUNCIONAN
        /*if(!err.isEmpty()) {
            errors = new Error(err.array().map(el => el['msg']).toString());
            const viewData = {errors}
            return res.render("users/register", viewData)
        };*/

        // EL USUARIO(EMAIL) NO PUEDE ESTAR YA CREADO
        const reqEmail = req.body.email;
        const compare = users.find(users => users.email == reqEmail)
        if (compare != undefined){
            errors = "Ya existe un usuario con este email.";
            const viewData = {errors};
            return res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'), viewData)
        }

        // LAS CONTRASEÑAS DEBEN SER IGUALES
        if(req.body.userPassword != req.body.confirmPassword){
        errors = "Las contraseñas no coinciden.";
        const viewData = {errors};
        return res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'), viewData)
        }

        // SE CARGA EL NUEVO USUARIO
        const newUser = req.body;
        newUser.id = users.length + 1
        newUser.id = String(newUser.id);
        const password = req.body.userPassword;
        const passwordHash = bcrypt.hashSync(password, 4);
        newUser.userPassword = passwordHash;
        newUser.confirmPassword = passwordHash;
        newUser.role = "user";
        users.push(newUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        const viewData = {user: newUser};
        return res.render(path.resolve(__dirname, '..', 'views', 'users', 'user'), viewData);
}

const login = (req,res) => {
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
    err = validationResult(req);
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

};

module.exports = {renderRegister, renderLogin, createUser, login};