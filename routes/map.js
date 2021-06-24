const express = require('express')

const mapController = require('../controllers/map')

const router = express.Router()

router.get('/maps', mapController.getMaps)
router.post('/maps', mapController.createMap)

module.exports = router
