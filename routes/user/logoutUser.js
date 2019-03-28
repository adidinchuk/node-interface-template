module.exports = {
    api: (req, res) => {
        req.session.destroy()
        res.status(200).send({ msg: 'session ended' });
    }
}