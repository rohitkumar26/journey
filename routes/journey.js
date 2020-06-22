const express = require('express');
const router = express.Router();
const moment = require('moment');
const Journey = require('../models/journey')
router.get('/', async (req, res) => {
    try {
        const result = await Journey.find(req.query).sort({ date: -1 }).exec();
        const currentdate = moment().format('YYYY-MM-DD');
        res.render('journey', { result, currentdate });
    }
    catch (err) {
        res.send(err);
    }
})
router.post('/', async (req, res) => {
    try {
        const newjourney = new Journey(req.body);
        await newjourney.save();
        res.redirect('/journey')
    }
    catch (err) {
        res.send(err.message);
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await Journey.findByIdAndDelete(req.params.id);
        // res.send({ msg: "deleted successfully...." })
        res.redirect('/journey');
    } catch (err) {
        res.send(err);
    }
})
router.put('/:id', async (req, res) => {
    try {
        const result = await Journey.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.redirect('/journey');
    } catch (error) {
        res.send(error);
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const result = await Journey.findOne({ _id: req.params.id }).exec();

        const currentdate = moment(result.date).format('YYYY-MM-DD');
        res.render('editjournal', { result, currentdate })
    }
    catch (err) {
        res.send(err);
    }

})
module.exports = router;