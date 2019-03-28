

// Authentication and Authorization Middleware
var auth_admin = function (req, res, next) {
    if (req.session && req.session.admin)
        return next();
    else
        return res.status(500)
            .send({ auth: false, message: 'Failed to authenticate token.' });
};

module.exports = auth_admin