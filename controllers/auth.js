const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});





module.exports = router;