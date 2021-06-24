exports.getMaps = (req, res, next) => {
	res.status(200).json({ maps: [{ title: 'first map' }] })
}

exports.createMap = (req, res, next) => {
	console.log(req.body)
	const title = req.body.title
	res.status(201).json({
		message: 'Map created',
		map: { id: 2, title: title },
	})
}
