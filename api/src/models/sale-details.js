module.exports = function (sequelize, DataTypes) { // esta funcionalidad se autoejecuta cuando llamo el archivo y me dice que puede ser llamada (la funcion) por otro archivo
  const SaleDetail = sequelize.define('SaleDetail',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      priceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      basePrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'sale_details', // esto me dice que está interactuando con la tabla 'users'
      timestamps: true, // esto pone la fecha del momento en que se crea o se modifica un dato
      paranoid: true, // esto me asegura que me muestre los datos de la tabla con delete null
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        },
        {
          name: 'sale_details_saleId_fk',
          using: 'BTREE',
          fields: [
            { name: 'saleId' }
          ]
        },
        {
          name: 'sale_details_productId_fk',
          using: 'BTREE',
          fields: [
            { name: 'productId' }
          ]
        },
        {
          name: 'sale_details_priceId_fk',
          using: 'BTREE',
          fields: [
            { name: 'priceId' }
          ]
        }
      ]
    }
  )

  SaleDetail.associate = function (models) {
    SaleDetail.belongsTo(models.Sale, { as: 'sale', foreignKey: 'saleId' })
    SaleDetail.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    SaleDetail.belongsTo(models.Price, { as: 'price', foreignKey: 'priceId' })
  }

  return SaleDetail // aqui le aclaro si el modelo esta relacionado con otros modelos
}
