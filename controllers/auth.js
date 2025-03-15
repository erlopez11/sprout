const express = require('express');
const router = express.Router();
const bycrypt = require('bcrypt');

const User = require('../models/user');


router.get('/sign-up', (req, res) => {
    res.status(200).render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({username: req.body.username});
        if (userInDatabase) {
            return res.send('Username already taken');
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match');
        }

        const hashedPassword = bycrypt.hashSync(req.body.password, 12);
        req.body.password = hashedPassword;

        await User.create(req.body);
        //TODO: Redirect to the sign in page after sign up
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})



module.exports = router;