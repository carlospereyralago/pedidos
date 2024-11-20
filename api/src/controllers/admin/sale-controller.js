const sequelizeDb = require('../../models')
const Sale = sequelizeDb.Sale
const SaleDetail = sequelizeDb.SaleDetail

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
