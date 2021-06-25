const MapInfo = require('../models/mapInfo')

exports.getMaps = (req, res, next) => {
	const user = req.params.user
	MapInfo.find({ belongsTo: user })
		.then(maps => {
			res.status(200).json(maps)
		})
		.catch(err => console.log)
}

exports.createMap = (req, res, next) => {
	console.log(req.body)
	const id = req.body.id
	const type = req.body.type
	const belongsTo = req.body.belongsTo
	const places = req.body.places
	const title = req.body.title
	const description = req.body.description
	const basemap = req.body.basemap

	const map = new MapInfo({
		id: id,
		type: type,
		belongsTo: belongsTo,
		places: places,
		title: title,
		description: description,
		basemap: basemap,
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
	const mapId = req.params.mapId

	const places = req.body.places
	const title = req.body.title
	const description = req.body.description
	const basemap = req.body.basemap

	MapInfo.findOne({ id: mapId })
		.then(map => {
			if (!map) throw new Error()

			map.places = places
			map.title = title
			map.description = description
			map.basemap = basemap

			return map.save()
		})
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err))
}

exports.removeMap = (req, res, next) => {
	const mapId = req.params.mapId

	MapInfo.findOne({ id: mapId })
		.then(map => {
			return MapInfo.findOneAndDelete({ id: mapId })
		})
		.then(result => {
			console.log(result)
			res.status(200).json('Map deleted')
		})
		.catch(err => console.log(err))
}
