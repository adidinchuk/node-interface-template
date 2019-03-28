const sequelize = require('../../config/sequelize')

module.exports = {
    api: (req, res) => {
        if (req.query.username == null) {
            console.log(req.session.did)
            sequelize.User.findOne({
                where: {
                    id: req.session.did,
                },
            })
                .then(user => {
                    if (user != null) {
                        console.log('user found in db');
                        user.password = "";
                        res.status(200).send({ user });
                    } else {
                        console.log('user not found in db');
                        res
                            .status(404)
                            .send({ auth: false, message: 'no user with that username' });
                    }
                })
                .catch(err => {
                    console.log('problem communicating with db');
                    res.status(500).json(err);
                });
        } else {
            console.log('admin ask');
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
                                    console.log('user found in db');
                                    res.status(200).send({ user });
                                } else {
                                    console.log('user not found in db');
                                    res
                                        .status(404)
                                        .send({ auth: false, message: 'no user with that username' });
                                }
                            })
                            .catch(err => {
                                console.log('problem communicating with db');
                                res.status(500).json(err);
                            });
                    } else {
                        return res.status(500).send({
                            auth: false,
                            message: 'username and token id do not match',
                        });
                    }
                } else {
                    res.status(404)
                        .send({ auth: false, message: 'this user is not authorized' });
                }
            })

        }
    }
}