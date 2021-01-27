const express = require('express')
const { getRates } = require('../controllers/api')
const router = express.Router()

// import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getRates)

module.exports = router
