const sequelize = require('../../config/sequelize')
const bcrypt = require('bcrypt-nodejs')
const resConfig = require('../../config/responseConfig')

module.exports = {
    api: (req, res) => {
        sequelize.User.findOne({
            where: {
                username: req.query.username,
            },
        })
            .then(user => {
                if (req.query.password == false) {
                    res.status(400)
                        .send(resConfig.generateReponse('password required', 1));
                } else if (user === null) {
                    res.status(400).send(resConfig.generateReponse('bed username', 1))
                } else {
                    bcrypt.compare(req.query.password, user.password, function (err, response) {
                        if (response === true) {
                            req.session.did = user.id;
                            if (user.admin)
                                req.session.admin = true;
                            res.status(200).send(resConfig.generateReponse('user found & logged in', 1));
                        } else {
                            res.status(400).send(resConfig.generateReponse('passwords do not match', 1));
                        }
                    });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
}