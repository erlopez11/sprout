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
            return res.render('auth/sign-up.ejs', {message: 'Username already taken'});
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.render('auth/sign-up.ejs', {message: 'Password and Confirm Password must match'});
        }

        if (!req.body.password.trim() || !req.body.username.trim()) {
            return res.render('auth/sign-up.ejs', {message: 'Input cannot be blank'});
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 12);
        req.body.password = hashedPassword;
        await User.create(req.body);
        return res.render('auth/sign-in.ejs', {message: 'Sign Up Successful'});

    } catch (error) {
        console.log(error);
        req.session.message = 'An error occured. Try again.'
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
            return res.render('auth/sign-in.ejs', {message: 'Login failed. Please try again.'});
         }
         const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
         );
         if(!validPassword) {
            return res.render('auth/sign-in.ejs', {message: 'Login failed. Please try again.'});
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

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;