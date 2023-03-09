function userLoggedMidleware(req, res, next) { 
    
    res.locals.userIsLogged = true;    


    next();
}

module.exports = userLoggedMidleware