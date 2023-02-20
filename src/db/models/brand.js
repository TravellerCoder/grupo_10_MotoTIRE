const { sequelize } = require(".");
const Product = require('models/product.js')

module.exports = (sequelize, DataTypes) => {
    const alias = 'Brands'
    const cols = {
        id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name : DataTypes.STRING,
    
    }
    const config = {
        tableName : 'Brands',
        timestamps : false,
    }
    
    
    const Brand = sequelize.define(alias, cols, config);
    
    Brand.associate = function(models){
        Brand.hasMany(models.Product, {
            as : 'products',
            foreignKey : 'brand_id'
        })
    }
    return brand;
}