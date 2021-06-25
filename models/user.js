const mongoose = require('mongoose')
const Schema = mongoose.Schema
const select = require('mongoose-json-select')

const userSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

userSchema.plugin(select, ['-_id -__v'].join(' '))

module.exports = mongoose.model('User', userSchema)
