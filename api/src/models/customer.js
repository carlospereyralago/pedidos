module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define('Customer',
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
        email: {
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
        tableName: 'customers',//esto me dice que está interactuando con la tabla 'companies' 
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
  
    Customer.associate = function (models) {
      Customer.hasMany(models.Sale, { as: 'sales', foreignKey: 'customerId' })
      Customer.hasMany(models.Return, { as: 'returns', foreignKey: 'customerId' })
      Customer.hasMany(models.CustomerActivationToken, { as: 'customerActivationToken', foreignKey: 'customerId' })
      Customer.hasMany(models.CustomerCredential, { as: 'customerCredential', foreignKey: 'customerId' })
      Customer.hasMany(models.CustomerResetPasswordToken, { as: 'customerResetPasswordToken', foreignKey: 'customerId' })
    }
  
    return Customer //aqui le aclaro si el modelo esta relacionado con otros modelos
  }