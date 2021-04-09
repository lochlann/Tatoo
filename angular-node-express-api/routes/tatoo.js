const jwtHelpers = require('../helpers/jwt_middleware');
const mongoose = require('mongoose');
const express = require('express');
const uid = require('uid-safe')
const jwt = require('jsonwebtoken');

const router = express.Router();

const TatooService = require('../services/service.tatoo');


const tatooSchema = new mongoose.Schema({
	name: String,
	description: String,
    price: Number,
});

const TatooModel = mongoose.model('tatoo', tatooSchema);

/* GET users listing. */
router.get('/', async (req, res, next) => {
	const data = await TatooModel.find()
	res.json(data);
});

router.post('/add', async (req, res, next) => {
	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;
	if (!name || !price) {
		res.status(401).json({ error: 'name and price must be provided' });
		return
	}
	const newTatoo = new TatooModel({ name, description, price });

	newTatoo.save()
		.then((result) => res.status(200).json({ tatoo: result }))
		.catch((err) =>
			res.status(500).json({ error: err, text: 'error when creating new user' }));
});

/* removes the tatoo from the user list by uid */
router.delete('/:id', async (req, res, next) => {
	try {
		const tatoo = await TatooModel.deleteOne({ _id: req.params.id });

		return res.json({ success: true });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});
module.exports = router;
