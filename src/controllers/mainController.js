const path = require('path');
const fs = require('fs');

const models = require('../database/models');
const Product = models.Product;

// CREAMOS LA CONSTANTE PRODUCTS PARA SU UTILIZACIÓN
const productsFilePath = path.resolve('./src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
//const usersFilePath = path.resolve('./src/data/users.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    index: async (req,res) => {
        const inSaleProducts = await Product.findAll({
            where: { category: true}
        })
        const userFinded = ""
        const viewData = {inSaleProducts, userFinded}
        /*if(userFinded){
            req.session.usuario = userFinded.name;
            req.session.role = userFinded.role;
            req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
            console.log(`El usuario ${req.session.usuario}
            con rol ${req.session.rol}
            ha visitado esta página ${req.session.visitas}.`)
        }*/

        return res.render(path.resolve(__dirname, '..', 'views','index'), viewData);
    }
};

module.exports = {controller};