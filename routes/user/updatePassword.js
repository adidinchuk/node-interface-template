const sequelize = require('../../config/sequelize')
const bcrypt = require('bcrypt-nodejs')
const resConfig = require('../../config/responseConfig')

module.exports = {
    api: (req, res) => {
        if (req.query.password != '' && req.query.password != null) {
            if (req.session.did != null) {
                sequelize.User.findOne({
                    where: {
                        id: req.session.did,
                    }
                }).then(user => {
                    if (user != null) {
                        bcrypt
                            .hash(req.query.password, null, null, function (err, hashedPassword) {
                                user.update({
                                    password: hashedPassword
                                }).then(() => {
                                    res.status(200).send(resConfig.generateReponse('password updated', 1));
                                });
                            });
                    } else {

                        res.status(400).send(resConfig.generateReponse('user not found', 1));
                    }
                }).catch(err => {
                    res.status(500).json(err);
                });
            }
        } else {
            res.status(400).send(resConfig.generateReponse("invalid password", 1));
        }

    }

}