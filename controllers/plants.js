const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    try {
        const loggedInUser = User.findById(req.session.user._id);
        res.render('plants/index.ejs', {
            plants: loggedInUser.plants,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});













module.exports = router;
