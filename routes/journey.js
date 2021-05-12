const express = require('express');
const router = express.Router();
const moment = require('moment');
const Journey = require('../models/journey');
const pagination = require('../middleware/pagination');
router.get('/', pagination(Journey), async (req, res) => {
    try {
        // const result = await Journey.find(req.query).sort({ date: -1 }).exec();
        const currentdate = moment().format('YYYY-MM-DD');

        res.render('journey', { result: res.paginatedResults, currentdate, currentpage: req.query.page });

    }
    catch (err) {
        res.send(err);
    }
})
router.post('/', async (req, res) => {
    try {
        const newjourney = new Journey(req.body);
        await newjourney.save();
        req.flash('message', 'Note added successfully...');
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
        req.flash('message', 'Note deleted successfully...');
        res.redirect('/journey');
    } catch (err) {
        res.send(err);
    }
})
router.put('/:id', async (req, res) => {
    try {
        const result = await Journey.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        req.flash('message', 'Note updated successfully...');
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