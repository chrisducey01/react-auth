const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbConnection = require('./database');
const routes = require('./routes');
const session = require('express-session');
const passport = require('./passport');
const MongoStore = require('connect-mongo')(session)

const app = express()
const PORT = process.env.PORT || 8080

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json());
app.use(session({
	secret: 'El-Castigador',
	store: new MongoStore({ mongooseConnection: dbConnection }),
	resave: false, 
	saveUninitialized: false
})
);

// Passport config for authentication
app.use(passport.initialize())
app.use(passport.session())

app.use(routes);

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
});