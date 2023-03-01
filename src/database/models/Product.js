module.exports = (sequelize, DataTypes) => {
    let alias = 'Product'
    let cols = {
        id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            
        },
        brand:{
            type: DataTypes.STRING,
            
            allowNull : false,
        },
        model :{
            type: DataTypes.STRING,
            allowNull : false,
        },
        measures:{
            type: DataTypes.STRING, 
            allowNull : false,
        },    
        price :{
            type:DataTypes.FLOAT,
            allowNull : false,
        },
        discount : {
            type:DataTypes.INTEGER,
            allowNull : true,
        },
        availability : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        category: {
            type: DataTypes.BOOLEAN,
            
            allowNull : false
        },
        description : {
            type: DataTypes.TEXT,
            allowNull : false,
        },
        subDescription: {
            type: DataTypes.TEXT,
            allowNull : true,
        },
        
        
        img :{
            type: DataTypes.STRING,

        },
        subImg : {
            type : DataTypes.STRING
        },



    }
    let config = {
        tableName : 'products',
        timestamps : false,
    }
    


    const Product = sequelize.define(alias, cols, config);
    

    return Product;
}




