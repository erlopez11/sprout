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

router.get('/new', async (req, res) => {
    res.status(200).render('plants/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        loggedInUser.plants.push(req.body); 
        await loggedInUser.save();
        res.redirect(`/users/${loggedInUser._id}/plants`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
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
        console.lof(error);
        res.redirect('/');
    }
});

router.delete('/:plantId', async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.session.user._id);
        loggedInUser.plants.id(req.params.plantId).deleteOne();
        await loggedInUser.save();
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
        res.redirect(`/users/${loggedInUser._id}/plants/${req.params.plantId}`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});










module.exports = router;
