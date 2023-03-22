const path = require('path');
const fs = require('fs');

const models = require('../database/models');
const Product = models.Product;




const controller = {
    index: async (req,res) => {
        const inSaleProducts = await Product.findAll({
            where: { category: true}
        })
        const viewData = {inSaleProducts}
        return res.render(path.resolve('src/views/index'), viewData) 
    },
    /*!searching: (req, res) => {
        
        
        
        return res.redirect('/')
    }, 

    searched:async (req, res) => {
        const searchedProducts = await Product.findAll({
            where : { brand : req.body.searcher}
           
        })
        return res.send(searchedProducts)
    }
    /**path.resolve('src/views/products/searchedProducts'), searchedProducts */

    
}

module.exports = {controller};