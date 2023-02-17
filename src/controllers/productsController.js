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



const productsController = {

    renderProductsCart: (req, res) => {
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'productCart'));
    },

    renderProductsDetail: (req,res) => {
        const idProductParam = req.params.id
        const productDetail = products.find((product) => product.id === idProductParam);
        const viewData = {product: productDetail};
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'productDetail'), viewData);
    },

    renderCreateProduct: (req, res) => {
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'createProduct'));
    },

    storeProduct: (req, res) => {
        const newProduct = req.body;
        const newImage = req.files;
        newProduct.id = products.length + 1
        newProduct.price = Number(newProduct.price);
        newProduct.discount = Number(newProduct.discount);
        newProduct.availability = Number(newProduct.availability);
        newProduct.id = String(newProduct.id);
        newProduct.img = newImage.img[0].filename
        newProduct.subImgs = [newImage.subImgs[0].filename, newImage.subImgs[1].filename];
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        const viewData = {product: newProduct};
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'productDetail'), viewData);
    },

    renderAdminProduct: (req, res) => {
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'adminProduct'));
    },

    renderShowProducts: (req, res) => {
        const viewData = {products}
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'showProducts'), viewData);
    },

    renderEditProduct: (req, res) => {
        const idProductParam = req.params.id
        const updateProduct = products.find((product) => product.id === idProductParam);
        const viewData = {product: updateProduct}
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'editProduct'), viewData);
    },

    updateProduct: (req, res) => {
        const newProduct = req.body;
        const newImage = req.files;
        newProduct.price = Number(newProduct.price);
        newProduct.discount = Number(newProduct.discount);
        newProduct.availability = Number(newProduct.availability);
        newProduct.img = newImage.img[0].filename
        newProduct.subImgs = [newImage.subImgs[0].filename, newImage.subImgs[1].filename];
        
        const productIndex = products.findIndex((product)=>{
            return product.id == req.params.id
        })
        if(productIndex == -1){
            return res.send("No existe el producto")
        }
        products[productIndex] = {...products[productIndex], ...newProduct}

        const jsonProduct = JSON.stringify(products)
        fs.writeFileSync(productsFilePath, jsonProduct) 
        
        const idProductParam = req.params.id
        const productDetail = products.find((product) => product.id === idProductParam);
        const viewData = {product: productDetail};
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'productDetail'), viewData);
    },

    renderDeleteForm: (req, res) => {
        const idProductParam = req.params.id
        const productDetail = products.find((product) => product.id === idProductParam);
        const viewData = {product: productDetail};
        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'deleteProduct'), viewData);
    },

    deleteProduct: (req, res) => {
        const idProduct = req.params.id;
        const productToDelete = products.find((product) => product.id == idProduct);
        const indexToDelete = products.indexOf(productToDelete);
        products.splice(indexToDelete, 1)
        const jsonProduct = JSON.stringify(products)
        fs.writeFileSync(productsFilePath, jsonProduct) 

        return res.render(path.resolve(__dirname, '..', 'views', 'products', 'adminProduct'));
    }
};




module.exports = productsController;