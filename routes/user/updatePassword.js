const sequelize = require('../../config/sequelize')
const bcrypt = require('bcrypt-nodejs')

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
                        console.log(req.query.password)
                        bcrypt
                            .hash(req.query.password, null, null, function (err, hashedPassword) {
                                user.update({
                                    password: hashedPassword
                                }).then(() => {
                                    console.log('password updated');
                                    res.status(200).send({ auth: true, message: 'password updated' });
                                });
                            });
                    } else {
                        console.log('user not found');
                        res.status(400).json('user not found');
                    }
                }).catch(err => {
                    console.log('problem communicating with db');
                    res.status(500).json(err);
                });
            }
        } else {
            console.log('invalid password');
            res.status(400).json({ "error": "invalid password" });
        }

    }

}