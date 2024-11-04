module.exports = function (sequelize, DataTypes) { // esta funcionalidad se autoejecuta cuando llamo el archivo y me dice que puede ser llamada (la funcion) por otro archivo
  const Product = sequelize.define('Product',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      productCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false
      },
      measurementUnit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      measurement: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      visible: {
        type: DataTypes.BOOLEAN,
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
      tableName: 'products', // esto me dice que está interactuando con la tabla 'products'
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
          name: 'products_productCategoryId_fk',
          using: 'BTREE',
          fields: [
            { name: 'productCategoryId' }
          ]
        }
      ]
    }
  )

  Product.associate = function (models) {
    Product.belongsTo(models.ProductCategory, { as: 'productCategory', foreignKey: 'productCategoryId' })
    Product.hasOne(models.Price, { as: 'price', foreignKey: 'productId', scope: { current: true } })
    Product.hasMany(models.Price, { as: 'prices' })
    Product.hasMany(models.SaleDetail, { as: 'product' })
    Product.hasMany(models.Sale, { as: 'sale' })
  }

  return Product // aqui le aclaro si el modelo esta relacionado con otros modelos
}
