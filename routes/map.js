const express = require('express')

const mapController = require('../controllers/map')

const router = express.Router()

router.get('/maps', mapController.getMaps)
router.post('/maps', mapController.createMap)
router.get('/maps/:user/:mapId', mapController.getMap)
router.patch('/maps/:user/:mapId', mapController.updateMap)
router.delete('/maps/:user/:mapId', mapController.removeMap)

module.exports = router
