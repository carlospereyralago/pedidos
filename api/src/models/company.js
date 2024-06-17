module.exports = function (sequelize, DataTypes) {
    const Company = sequelize.define('Company',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        commercialAddress: {
          type: DataTypes.STRING,
          allowNull: false
        },
        fiscalAddress: {
          type: DataTypes.STRING,
          allowNull: false
        },
        commercialName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        fiscalName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        vatNumber: {
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
        tableName: 'companies',//esto me dice que está interactuando con la tabla 'companies' 
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
  
    Company.associate = function (models) {
     
    }
  
    return Company //aqui le aclaro si el modelo esta relacionado con otros modelos
  }