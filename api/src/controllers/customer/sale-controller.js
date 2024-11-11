const sequelizeDb = require('../../models')
const Sale = sequelizeDb.Sale
const SaleDetail = sequelizeDb.SaleDetail

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

    res.status(200).send(sale.reference)
  } catch (err) {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al finalizar la venta.'
    })
  }
}
