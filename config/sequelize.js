
const Sequelize = require('sequelize')
const UserModel = require('../models/user')
const DeviceModel = require('../models/device')
const HumidityModel = require('../models/humidity')
const TemperatureModel = require('../models/temperature')
const Dht11Model = require('../models/dht11')

const sequelize = new Sequelize('octonade', 'octonade', 'cAwm*K2$Q_H6^*n@F9GjDm6u37^Xu%hp4Geyc9g!vZ', {
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
const Device = DeviceModel(sequelize, Sequelize);
const Humidity = HumidityModel(sequelize, Sequelize);
const Temperature = TemperatureModel(sequelize, Sequelize);
const Dht11 = Dht11Model(sequelize, Sequelize);

/*sequelize.sync().then(() => {
    console.log(`Users db and user table have been created`);
});*/
module.exports = {
    User,
    Device,
    Temperature,
    Humidity,
    Dht11
}