const express = require('express')

const mapController = require('../controllers/map')

const router = express.Router()
const isAuth = require('../middleware/is-auth')

router.get('/maps', mapController.getMaps)
router.post('/maps', isAuth, mapController.createMap)
router.get('/maps/:user/:mapId', mapController.getMap)
router.patch('/maps/:user/:mapId', isAuth, mapController.updateMap)
router.delete('/maps/:user/:mapId', isAuth, mapController.removeMap)

module.exports = router
