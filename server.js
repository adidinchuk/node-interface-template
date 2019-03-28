const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')


const auth_admin = require('./config/auth/sessionAdmin')
const auth_user = require('./config/auth/sessionUser')

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(session({
    secret: require('./config/sessionConfig').secret,
    resave: true,
    saveUninitialized: true
}))

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://home-automation-ui.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//user routes
app.get('/users', auth_user, require('./routes/user/getUser').api)
app.get('/users/update', auth_user, require('./routes/user/updateUser').api)
app.get('/users/update/password', auth_user, require('./routes/user/updatePassword').api)
app.get('/users/create', auth_admin, require('./routes/user/createUser').api)
app.get('/users/authenticate', require('./routes/user/authenticateUser').api)
app.get('/users/logout', auth_user, require('./routes/user/logoutUser').api)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

module.exports = app