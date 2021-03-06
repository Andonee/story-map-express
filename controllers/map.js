const Map = require('../models/map')

exports.getMaps = (req, res, next) => {
	Map.find()
		.then(maps => {
			res.status(200).json(maps)
		})
		.catch(err => console.log)
}

exports.getMap = (req, res, next) => {
	const user = req.params.user
	const mapId = req.params.mapId
	console.log('map id', mapId)
	Map.findOne({ id: mapId, belongsTo: user })
		.then(map => {
			if (!map) throw new Error()

			res.status(200).json(map)
		})
		.catch(err => console.log(err))
}

exports.createMap = (req, res, next) => {
	console.log(req.body)
	const id = req.body.id
	const type = req.body.type
	const belongsTo = req.body.belongsTo
	const data = req.body.data

	const map = new Map({
		id: id,
		type: type,
		belongsTo: belongsTo,
		data: data,
	})

	map
		.save()
		.then(result => {
			console.log(result)
			res.status(201).json({
				message: 'Map created',
				map: result,
			})
		})
		.catch(err => console.log(err))
}

exports.updateMap = (req, res, next) => {
	const user = req.params.user
	const mapId = req.params.mapId

	const data = req.body.data

	Map.findOne({ id: mapId, belongsTo: user })
		.then(map => {
			if (!map) throw new Error()

			map.data = data
			return map.save()
		})
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err))
}

exports.removeMap = (req, res, next) => {
	const user = req.params.user
	const mapId = req.params.mapId

	Map.findOne({ id: mapId, belongsTo: user })
		.then(map => {
			return Map.findOneAndDelete({ id: mapId })
		})
		.then(result => {
			console.log(result)
			res.status(200).json('Map deleted')
		})
		.catch(err => console.log(err))
}
