const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const brand = require('models/brand.js')

module.exports = (sequelize, DataTypes) => {
    const alias = 'Products'
    const cols = {
        id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        model : DataTypes.STRING,
        brand_id:DataTypes.INTEGER,
        price : DataTypes.FLOAT,
        discount : DataTypes.INTEGER,
        description : DataTypes.TEXT,
        subDescription: DataTypes.TEXT,
        availability : DataTypes.INTEGER,
        category_id : DataTypes.INTEGER,
        img : DataTypes.STRING,
        subImg : DataTypes.STRING,
    }
    const config = {
        tableName : 'products',
        timestamps : false,
    }

    Product.associate = function(models){
        Product.belongsTo(models.Product, {
            as : 'products',
            foreignKey : 'brand_id'
        })

    const product = sequelize.define(alias, cols, config);
    return product;
}
}