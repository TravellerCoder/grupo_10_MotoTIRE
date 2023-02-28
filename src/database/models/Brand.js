const Product = require('./Product')

module.exports = function (sequelize, DataTypes) {
    let alias = 'Brand'
    let cols = {
        brand_id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name : DataTypes.STRING,
    
    }
    let config = {
        tableName : 'brands',
        timestamps : false,
    }
    
    
    const Brand = sequelize.define(alias, cols, config);
    
    Brand.associate=function(models){
        Brand.hasMany(models.Product, {
            foreingKey : "brand_id",
            as : "products",
            
        })
    }
    return Brand;
}