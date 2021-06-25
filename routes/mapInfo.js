const express = require('express')

const mapInfoController = require('../controllers/mapInfo')

const router = express.Router()

router.get('/mapsInfo/:user', mapInfoController.getMaps)
router.post('/mapsInfo', mapInfoController.createMap)
router.patch('/mapsInfo/:mapId', mapInfoController.updateMap)
router.delete('/mapsInfo/:mapId', mapInfoController.removeMap)

module.exports = router
