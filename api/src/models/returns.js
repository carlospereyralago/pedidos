module.exports = function (sequelize, DataTypes) {//esta funcionalidad se autoejecuta cuando llamo el archivo y me dice que puede ser llamada (la funcion) por otro archivo
    const Return = sequelize.define('Return',
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
        customerId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: false
        },
        totalBasePrice: {
          type: DataTypes.DECIMAL,
          primaryKey: true,
          allowNull: false
        },
        returnDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        returnTime: {
          type: DataTypes.TIME,
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
        tableName: 'returns',//esto me dice que está interactuando con la tabla 'users' 
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
          },
          {
            name: 'returns_saleId_fk',
            using: 'BTREE',
            fields: [
              { name: 'SaleId' }
            ]
          },
          {
            name: 'returns_customerId_fk',
            using: 'BTREE',
            fields: [
              { name: 'customerId' }
            ]
          }
          
        ]
      }
    )
  
    Return.associate = function (models) {
      Return.belongsTo(models.Sale, { as: 'sale', foreignKey: 'saleId' })   
      Return.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })   
    }
  
    return Return //aqui le aclaro si el modelo esta relacionado con otros modelos

  }

