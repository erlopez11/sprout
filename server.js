const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const authController = require('./controllers/auth');

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


app.get('/', (req, res) => {
    res.status(200).render('index.ejs');
});

app.use('/auth', authController);

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});