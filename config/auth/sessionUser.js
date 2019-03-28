

// Authentication and Authorization Middleware
var auth_user = function (req, res, next) {
    if (req.session)
        return next();
    else
        return res.status(500)
            .send({ auth: false, message: 'Failed to authenticate token.' });
};

module.exports = auth_user