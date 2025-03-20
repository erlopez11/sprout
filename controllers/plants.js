const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        res.render('plants/index.ejs', {
            plants: loggedInUser.plants,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/season', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        console.log(req.body);
        res.render('plants/seasonIdx.ejs', {
            season: req.body,
            plants: loggedInUser.plants,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.get('/new', async (req, res) => {
    res.status(200).render('plants/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        loggedInUser.plants.push(req.body); 
        await loggedInUser.save();
        req.session.message = 'New Plant Added';
        res.redirect(`/users/${loggedInUser._id}/plants`);
    } catch (error) {
        console.log(error);
        res.render('error.ejs', {msg: 'An error occured. Please try again.'});
    }
});

router.get('/:plantId', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        const plant = loggedInUser.plants.id(req.params.plantId);
        res.render('plants/show.ejs', {
            plant
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:plantId', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        loggedInUser.plants.id(req.params.plantId).deleteOne();
        await loggedInUser.save();
        req.session.message = 'Delete Successful'
        res.redirect(`/users/${loggedInUser._id}/plants`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:plantId/edit', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        const plant = loggedInUser.plants.id(req.params.plantId);
        res.status(200).render('plants/edit.ejs', {
            plant
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:plantId', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        const plant = loggedInUser.plants.id(req.params.plantId);
        plant.set(req.body);
        await loggedInUser.save();
        req.session.message = 'Update Successful';
        res.redirect(`/users/${loggedInUser._id}/plants/${req.params.plantId}`)
    } catch (error) {
        console.log(error);
        res.render('error.ejs', {msg: 'An error occured. Please try again.'});
    }
});










module.exports = router;
