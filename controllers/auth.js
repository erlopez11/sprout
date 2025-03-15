const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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
});

router.get('/sign-in', (req, res) => {
    res.status(200).render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
    try {
         const userInDatabase = await User.findOne({username: req.body.username});
         if (!userInDatabase) {
            return res.send('Login failed. Please try again.');
         }
         const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
         );
         if(!validPassword) {
            return res.send('Login failed. Please try again.');
         }

         req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id
         };
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



module.exports = router;