const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
	const login = req.body.user
	const password = req.body.password

	User.findOne({ user: login })
		.then(user => {
			if (user) throw new Error('Użytkownik o tej nazwie już istnieje')
			const newUser = new User({
				user: login,
				password: password,
			})

			newUser
				.save()
				.then(result => {
					console.log(result)
					res.status(201).json({
						message: 'user created',
						user: result,
					})
				})
				.catch(err => console.log(err))
		})
		.catch(err => {
			console.log(err)
			res.status(401).json({ message: 'Użytkownik o tej nazwie już istnieje' })
		})
}

exports.login = (req, res, next) => {
	const login = req.body.user
	const password = req.body.password

	User.findOne({ user: login })
		.then(user => {
			if (!user) {
				res.status(404).json({ message: 'Brak użytkownika o takiej nazwie' })
				return
			} else if (user.password !== password) {
				res.status(404).json({ message: 'Niewłaściwe hasło' })
				throw new Error()
			}

			const token = jwt.sign({ login: login }, 'jkldufioszdlknkldshfkhslfd', {
				expiresIn: 60 * 60 * 4,
			})

			res.status(200).json({ user: login, token: token })
		})
		.catch(err => {
			console.log(err.message)
		})
}
