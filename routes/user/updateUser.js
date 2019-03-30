const sequelize = require('../../config/sequelize')
const resConfig = require('../../config/responseConfig')

module.exports = {
    api: (req, res) => {
        query = {};
        if (req.query.first_name != null)
            query.first_name = req.query.first_name
        if (req.query.last_name != null)
            query.last_name = req.query.last_name
        if (req.query.email != null)
            query.email = req.query.email
        if (req.query.username != null)
            query.username = req.query.username

        if (req.query.username != null) {
            sequelize.User.findOne({
                where: {
                    id: req.session.did,
                }
            }).then(user => {
                if (user != null) {
                    sequelize.User.findOne({
                        where: {
                            username: query.username,
                            id: {
                                $ne: req.session.did
                            }
                        }
                    }).then(user_check => {
                        if (user_check == null) {
                            user.update(query).then(() => {
                                res.status(200).send(resConfig.generateReponse('user updated', 1));
                            });
                        } else {
                            res.status(400).send(resConfig.generateReponse('username already exists', 1));
                        }
                    })
                } else
                    res.status(400).send(resConfig.generateReponse('user not found', 1));
            }).catch(err => {
                res.status(500).json(err);
            });
        } else {
            sequelize.User.findOne({
                where: {
                    id: req.session.did,
                }
            }).then(user => {
                user.update(query).then(() => {

                    res.status(200).send(resConfig.generateReponse('user updated', 1));
                });

            });
        }

    }

}