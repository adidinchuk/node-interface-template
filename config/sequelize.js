
const Sequelize = require('sequelize')
const UserModel = require('../models/user')

const sequelize = new Sequelize('hive-platform', 'hive_db_user', 'cAwm*K2$Q_H6^*n@F9GjDm6u37^Xu%hp4Geyc9g!vZ', {
    host: '34.73.154.90',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const User = UserModel(sequelize, Sequelize);

/*sequelize.sync().then(() => {
    console.log(`Users db and user table have been created`);
});*/
module.exports = {
    User
}