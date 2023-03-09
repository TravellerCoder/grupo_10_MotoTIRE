function authMidleware( req, res, next) {
    if( !req.session.userLogged){
        return res.redirect('/ingresar')
    }
    next();
}

module.exports = authMidleware;