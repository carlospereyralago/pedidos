module.exports = function (sequelize, DataTypes) { // esta funcionalidad se autoejecuta cuando llamo el archivo y me dice que puede ser llamada (la funcion) por otro archivo
  const Sale = sequelize.define('Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      customerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false
      },
      totalBasePrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      saleDate: {
        type: DataTypes.DATEONLY
      },
      saleTime: {
        type: DataTypes.TIME
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'sales', // esto me dice que está interactuando con la tabla 'users'
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
          name: 'sales_customerId_fk',
          using: 'BTREE',
          fields: [
            { name: 'customerId' }
          ]
        }
      ]
    }
  )

  Sale.associate = function (models) {
    Sale.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    Sale.hasMany(models.Return, { as: 'returns', foreignKey: 'saleId' })
    Sale.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'saleId' })
    Sale.belongsToMany(models.Product, { through: models.SaleDetail, as: 'products', foreignKey: 'saleId' })
  }

  return Sale // aqui le aclaro si el modelo esta relacionado con otros modelos
}
