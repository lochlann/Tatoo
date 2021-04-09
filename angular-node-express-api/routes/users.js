const jwtHelpers = require('../helpers/jwt_middleware');
const mongoose = require('mongoose');
const express = require('express');
const uid = require('uid-safe')
const jwt = require('jsonwebtoken');

const router = express.Router();

const UserService = require('../services/service.user');


const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

const UserModel = mongoose.model('user', userSchema);

/* GET users listing. */
router.get('/', jwtHelpers.WithJWTAuth, async (req, res, next) => {
	const data = await UserModel.find()
	res.json({ users: data });
});

/* adds a new user to the list */
router.post('/register', async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		res.status(401).json({ error: 'username and password must be provided' });
		return
	}
	const newUser = new UserModel({ username, password });

	newUser.save()
		.then((result) => res.status(200).json({ user: result }))
		.catch((err) =>
			res.status(500).json({ error: err, text: 'error when creating new user' }));
});

/* adds a new user to the list */
router.post('/login', async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		res.status(401).json({ error: 'username and password must be provided' });
		return
	}

	const user = await UserModel.findOne({ username, password });

	if (!user) {
		res.status(401).json({ error: 'Invalid credentials' });
		return
	}
	// TODO : auth user

	// Generate an access token
	const accessToken = jwt.sign({ username: user.username, id: user._id }, jwtHelpers.jwtSecret);

	res.status(200).json({ user: { username: user.username, id: user._id, token: accessToken } })
});

/* retrieves a user by uid */
router.get('/:id', async (req, res, next) => {
	try {
		const user = await UserService.retrieve(req.params.id);

		return res.json({ user: user });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

/* updates the user by uid */
router.put('/:id', async (req, res, next) => {
	try {
		const user = await UserService.update(req.params.id, req.body);

		return res.json({ user: user });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

/* removes the user from the user list by uid */
router.delete('/:id', async (req, res, next) => {
	try {
		const user = await UserModel.deleteOne({ _id: req.params.id });

		return res.json({ success: true });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

module.exports = router;
