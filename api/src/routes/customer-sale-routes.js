module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/customer/sale-controller.js')

  router.get('/', controller.findAll)
  router.post('/', controller.create)

  app.use('/api/customer/sales', router)
}
