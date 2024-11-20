const sequelizeDb = require('../../models')
const Sale = sequelizeDb.Sale
const SaleDetail = sequelizeDb.SaleDetail
const Customer = sequelizeDb.Customer

exports.create = async (req, res) => {
  try {
    const products = req.body.products
    const totalBasePrice = products.reduce((acc, product) => acc + (product.quantity * product.price.basePrice), 0)

    const data = {
      customerId: 1,
      reference: 98371,
      totalBasePrice,
      saleDate: new Date().toISOString().slice(0, 10),
      saleTime: new Date().toTimeString().slice(0, 8)
    }

    const sale = await Sale.create(data)

    const saleDetails = products.map(product => ({
      saleId: sale.id,
      productId: product.id,
      productName: product.name,
      priceId: product.price.id,
      quantity: product.quantity,
      unitPrice: product.price,
      basePrice: product.price.basePrice
    }))

    await SaleDetail.bulkCreate(saleDetails)

    data.saleDetails = saleDetails

    const customer = await Customer.findByPk(data.customerId)
    data.id = data.customerId
    data.email = customer.email

    req.redisClient.publish('new-sale', JSON.stringify(data))

    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al finalizar la venta.'
    })
  }
}

exports.findAll = async (req, res) => {
  Sale.findAll({
    attributes: ['id', 'customerId', 'reference', 'totalBasePrice', 'saleDate', 'saleTime'],
    order: [['id', 'ASC']],
    include: [
      {
        model: sequelizeDb.SaleDetail,
        as: 'saleDetails',
        attributes: ['productId', 'productName', 'basePrice', 'quantity'],
        include: [
          {
            model: sequelizeDb.Product,
            as: 'product',
            attributes: ['measurementUnit', 'measurement']
          }
        ]
      }
    ]
  }).then(result => {
    res.status(200).send(result)
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}
