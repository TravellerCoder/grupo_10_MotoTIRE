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
    }
};

module.exports = {controller};