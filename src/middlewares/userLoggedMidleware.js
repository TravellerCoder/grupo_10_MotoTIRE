function userLoggedMidleware(req, res, next) { 
    
    res.locals.userIsLogged = false;    


    next();
};

module.exports = userLoggedMidleware