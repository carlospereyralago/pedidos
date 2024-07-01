module.exports = function (sequelize, DataTypes) {
    const ProductCategories = sequelize.define('ProductCategories',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
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
        tableName: 'product_categories',//esto me dice que está interactuando con la tabla 'companies' 
        timestamps: true,// esto pone la fecha del momento en que se crea o se modifica un dato
        paranoid: true,//esto me asegura que me muestre los datos de la tabla con delete null
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [
              { name: 'id' }
            ]
          }
        ]
      }
    )
  
    ProductCategories.associate = function (models) {
      ProductCategories.hasMany(models.Product, { as: 'productCategory', foreignKey: 'productCategoryId' }) 
    }
  
    return ProductCategories //aqui le aclaro si el modelo esta relacionado con otros modelos
  }