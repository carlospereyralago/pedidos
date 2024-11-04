const sequelizeDb = require('../../models')
const Product = sequelizeDb.Product

exports.findAll = (req, res) => {
  Product.findAll({
    attributes: ['id', 'name', 'measurementUnit', 'measurement'],
    order: [['name', 'ASC']],
    include: [
      {
        model: sequelizeDb.Price,
        as: 'price',
        attributes: ['basePrice']
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
