const mongoose = require('mongoose')
const Schema = mongoose.Schema
const select = require('mongoose-json-select')

const mapSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		belongsTo: {
			type: String,
			required: true,
		},
		data: {
			type: Schema.Types.Mixed,
			required: true,
		},
	},
	{ timestamps: true }
)

mapSchema.plugin(select, ['-_id -__v'].join(' '))

module.exports = mongoose.model('Map', mapSchema)
