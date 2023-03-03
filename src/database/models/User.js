module.exports = (sequelize, DataTypes) => {
    let alias = "User"
    let cols  = {
        user_id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email :{
            type : DataTypes.STRING,
            allowNull : false,
            
        },
        adress : {
            type : DataTypes.STRING,
            allowNull : false
        },
        city : {
            type :DataTypes.STRING
        },
        country : {
            type :DataTypes.STRING
        },
        postalCode : {
            type : DataTypes.STRING,
        },
        phone : {
            type : DataTypes.STRING
        }, 
        userPassword : {
            type : DataTypes.STRING,
            allowNull : false
        },
        confirmPassword :{
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName : 'users',
        timestamps : false
    }

    const User = sequelize.define(alias, cols, config);
    
    return User;

}