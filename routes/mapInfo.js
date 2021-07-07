const express = require('express')

const mapInfoController = require('../controllers/mapInfo')

const router = express.Router()
const isAuth = require('../middleware/is-auth')

router.get('/mapsInfo/:user', isAuth, mapInfoController.getMaps)
router.post('/mapsInfo', isAuth, mapInfoController.createMap)
router.patch('/mapsInfo/:mapId', isAuth, mapInfoController.updateMap)
router.delete('/mapsInfo/:mapId', isAuth, mapInfoController.removeMap)

module.exports = router
