const express = require('express')
const router = express.Router()

// Controllers
const { orderBook, changeOrder, validOrder, getAllBook } = require('../controllers/book.controller')

router.route('/orderBook').post(orderBook)
router.route('/changeOrder/:id').put(changeOrder)
router.route('/validOrder/:id').put(validOrder)
router.route('/getAllBook').get(getAllBook)

module.exports = router