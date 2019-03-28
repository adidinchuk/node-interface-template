const sequelize = require('../../config/sequelize')

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
        console.log(query.username)
        if (req.query.username != null) {
            console.log(req.session.did)
            sequelize.User.findOne({
                where: {
                    id: req.session.did,
                }
            }).then(user => {
                if (user != null) {
                    console.log(query.username)
                    console.log(req.session.did)
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
                                console.log('user updated');
                                res.status(200).send({ auth: true, message: 'user updated' });
                            });
                        } else {
                            console.log('username already exists');
                            res.status(400).json({ "error": "username already exists" });
                        }
                    })
                } else {
                    console.log('user not found');
                    res.status(400).json('user not found');
                }
            }).catch(err => {
                console.log('problem communicating with db');
                res.status(500).json(err);
            });
        } else {
            console.log(req.session.did)
            sequelize.User.findOne({
                where: {
                    id: req.session.did,
                }
            }).then(user => {
                user.update(query).then(() => {
                    console.log('user updated');
                    res.status(200).send({ auth: true, message: 'user updated' });
                });

            });
        }

    }

}