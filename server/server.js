const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('./passport');

const app = express()
const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react-auth",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

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