module.exports = function (sequelize, DataTypes) {//esta funcionalidad se autoejecuta cuando llamo el archivo y me dice que puede ser llamada (la funcion) por otro archivo
    const Fingerprint = sequelize.define('Fingerprint',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        customerId: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        fingerprint: {
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
        tableName: 'fingerprints',//esto me dice que está interactuando con la tabla 'users' 
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
            name: 'fingerprints_customerId_fk',
            using: 'BTREE',
            fields: [
              { name: 'customerId' }
            ]
          }
        ]
      }
    )
  
    Fingerprint.associate = function (models) {
      Fingerprint.belongsTo(models.Customer, { as: 'customers', foreignKey: 'customerId' })
      Fingerprint.hasMany(models.Contact, { as: 'contact', foreignKey: 'fingerprintId' })
    }
  
    return Fingerprint //aqui le aclaro si el modelo esta relacionado con otros modelos

  }

