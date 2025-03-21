const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');
const isMessageStored = require('./middleware/is-message-stored');

const authController = require('./controllers/auth');
const plantsController = require('./controllers/plants');

const app = express();

dotenv.config();

const port = process.env.PORT ||'3000';

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(isMessageStored);
app.use(passUserToView);

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/plants`);
    } else {
        res.render('index.ejs');
    }
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/plants', plantsController);


app.get('*', (req, res) => {
    res.render('error.ejs', {msg: 'Page not found'});
});

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});