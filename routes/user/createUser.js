const sequelize = require('../../config/sequelize')
const bcrypt = require('bcrypt-nodejs')

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
        if (query.password === '' || query.username === '') {
            res.json('username and password required');
        }
        sequelize.User.findOne({
            where: {
                username: query.username,
            },
        })
            .then(user => {
                if (user != null) {
                    console.log('username already taken');
                    res.json('username already taken');
                } else {
                    bcrypt
                        .hash(query.password, null, null, function (err, hashedPassword) {
                            query.password = hashedPassword
                            sequelize.User.create(query).then(() => {
                                console.log('user created in db');
                                res.status(200).send({ message: 'user created' });
                            });
                        });
                }
            })
            .catch(err => {
                console.log('problem communicating with db');
                res.status(500).json(err);
            });
    }

}