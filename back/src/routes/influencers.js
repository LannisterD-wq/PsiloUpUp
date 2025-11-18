const { Router } = require('express')
const InfluencerController = require('../controllers/InfluencerController')

const router = Router()

router.post('/apply', InfluencerController.apply)

module.exports = router

