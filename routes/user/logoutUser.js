const resConfig = require('../../config/responseConfig')

module.exports = {
    api: (req, res) => {
        req.session.destroy()
        res.status(200).send(resConfig.generateReponse('session ended', 1));
    }
}