const sequelize = require('../../config/sequelize')
const resConfig = require('../../config/responseConfig')

module.exports = {
    api: (req, res) => {
        if (req.query.username == null) {
            sequelize.User.findOne({
                where: {
                    id: req.session.did,
                },
            })
                .then(user => {
                    if (user != null) {
                        user.password = "";
                        res.status(200).send({ user });
                    } else {
                        res.status(404)
                            .send(resConfig.generateReponse('no user with that username', 1));
                    }
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {
            sequelize.User.findOne({
                where: {
                    id: req.session.did,
                },
            }).then(admin => {
                if (admin != null) {
                    if (admin.admin) {
                        sequelize.User.findOne({
                            where: {
                                username: req.query.username,
                            },
                        })
                            .then(user => {
                                if (user != null) {
                                    res.status(200).send({ user });
                                } else {
                                    res.status(404)
                                        .send(resConfig.generateReponse('no user with that username', 1));
                                }
                            })
                            .catch(err => {
                                res.status(500).json(err);
                            });
                    } else {
                        return res.status(500).send(
                            resConfig.generateReponse('username and token id do not match', 1)
                        );
                    }
                } else {
                    res.status(404)
                        .send(resConfig.generateReponse('this user is not authorized', 1));
                }
            })

        }
    }
}