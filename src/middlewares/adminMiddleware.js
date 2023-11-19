const path = require('path')

const models = require('../database/models');
const User = models.User;

async function adminMiddleware(req, res, next) {
    try {
        if (req.session.user) {
            const user = await User.findOne({ email: req.session.user.email });
            if (user.email != 'admin@mototire.com') {
                return next();
            } else {
                // Si el usuario no es administrador, devuelve un error 401
                return res.status(401).send('No autorizado');
            }
        } else {
            // Si no hay un usuario en la sesión, también devuelve un error 401
            return res.status(401).send('No autorizado');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error interno del servidor');
    }
}
module.exports = adminMiddleware;