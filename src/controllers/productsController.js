const path = require('path');
const fs = require('fs');
const { create } = require('domain');
const models = require('../database/models');
const Product = models.Product;
const { Op }= require('sequelize');





// Express-validator
const {body, validationResult  } = require('express-validator');





const productsController = {

    renderProductsCart: (req, res) => {
        return res.render(path.resolve('src/views/products/productCart'));
    },

    renderProductsDetail: (req,res) => {
        Product.findByPk(req.params.id)
            .then(function(products){
                return res.render(path.resolve('src/views/products/productDetail'), {products})
            })
    
    }, 

    renderCreateProduct: function (req, res)  {
        Product.findAll()
            .then(function(products){
                return res.render( path.resolve('src/views/products/createProduct'), {products})
            }) 
        
    },

    storeProduct:async (req, res) =>{
        
        const data = {
            brand: req.body.brand,
            model: req.body.model,
            measures: req.body.measures,
            price: req.body.price, 
            discount: req.body.discount,
            description: req.body.description,
            subDescription: req.body.subDescription,
            availability: req.body.availability,
            category: req.body.category,
            img: req.file.filename,
            subImg: req.body.subImg,
        }
        console.log(data)
        Product.create(data)
            .then(product => {
                res.redirect('/');})
                .catch(error => res.send(error))
    }, 
    renderAdminProduct: (req, res) => {
        return res.render(path.resolve('src/views/products/adminProduct'),{products});
    }, 

    renderShowProducts: (req, res) => {
        Product.findAll()
        .then(function(products){
            return res.render(path.resolve('src/views/products/showProducts'), {products})
        })
    },
    renderEditProduct: (req, res) => {
        Product.findByPk(req.params.id)
        .then(function(products){
            return res.render(path.resolve('src/views/products/editProduct'), {products})
        })
        
    }, 
    updateProduct: async (req, res) =>{
            const data = {
                brand: req.body.brand,
                model: req.body.model,
                measures: req.body.measures,
                price: req.body.price, 
                discount: req.body.discount,
                description: req.body.description,
                subDescription: req.body.subDescription,
                availability: req.body.availability,
                category: req.body.category,
                img: req.file.filename,
                subImg: req.body.subImg,
            }
            console.log(data)
            Product.update(data,{
                where:{
                    id : req.params.id
                },
            })
                .then(product => {
                    res.redirect('/detalle-producto/' + req.params.id) 
                }

                )
        }, 

    renderDeleteForm: (req, res) => {
        Product.findByPk(req.params.id)
            .then(function(products){
                return res.render(path.resolve('src/views/products/deleteProduct'), {products})
            })
        
    },

    deleteProduct: (req, res) => {
        Product.destroy({
            where: {
                id : req.params.id
            }
        })
        res.redirect('/'); 
    },
    searching: (req, res) => {
        return res.render(path.resolve('src/views/index'))
    }, 

    searched:async (req, res) => {
        const searchedProducts = await Product.findAll({
            where : { brand : req.body.searcher}
        })
        return res.render(path.resolve('src/views/products/searchedProducts'), {searchedProducts})
        }
    }



module.exports = productsController;