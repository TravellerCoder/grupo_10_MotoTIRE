const path = require('path')

const User = require('../database/models/User');

async function adminMiddleware(req, res, next) {
    try {
        const user = await User.findOne({ email: req.session.user.email });
        if (user.role === 'admin' || bcrypt.compareSync('admin@mototire.com', user.email)) {
            return next();
        } else {
            return  res.render(path.resolve('src/views/users/register'));
        }
    } catch (error) {
        console.log(error);
        return res.render(path.resolve('src/views/users/register'));
    }
}

module.exports = adminMiddleware;