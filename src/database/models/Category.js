const Product = require('./Product')

module.exports = function (sequelize, DataTypes) {
    let alias = 'Category'
    let cols = {
        id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name : DataTypes.STRING,
    
    }
    let config = {
        tableName : 'categories',
        timestamps : false,
    }
    
    
    const Category = sequelize.define(alias, cols, config);
    
   /** Category.associate=function(models){
        Category.hasMany(models.Product,{
            
            as:'products'
        })}*/
        return Category;
}
    