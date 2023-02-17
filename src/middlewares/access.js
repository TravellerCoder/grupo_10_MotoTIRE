const fs = require('fs');
const path = require('path');


const {User} = require('../data/users');

module.exports = (req,res,next) =>{
    return next()
}

/* 
module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )
    res.locals.usuario = false;
    
    if(req.session.usuario){
        //console.log('Daniel '+ req.session.usuario.email);
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        User.findOne({
            where: {
            email: req.cookies.email
            }
        })
        .then(user =>{
            req.session.usuario = user;
            res.locals.usuario = user;
            
            return next();
    
        })
                
    }else{
        return next();
    }
}

*/

