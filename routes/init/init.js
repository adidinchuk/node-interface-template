const sequelize = require('../../config/sequelize')
const bcrypt = require('bcrypt-nodejs')
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
        if (req.query.password != null)
            query.password = req.query.password
        console.log(query)
        query.admin = true
        if (query.password === '' || query.username === '') {
            res.status(500).send(resConfig.generateReponse('username and password required', 1));
        }
        sequelize.User.findOne({
            where: {
                admin: true,
            },
        })
            .then(user => {
                if (user != null) {
                    res.status(500).send(resConfig.generateReponse('table already initialized', 1));
                } else {
                    bcrypt
                        .hash(query.password, null, null, function (err, hashedPassword) {
                            query.password = hashedPassword
                            sequelize.User.create(query).then(() => {
                                res.status(200).send(resConfig.generateReponse('user created', 1));
                            });
                        });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

}