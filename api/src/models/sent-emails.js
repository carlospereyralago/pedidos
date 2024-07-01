module.exports = function (sequelize, DataTypes) {//esta funcionalidad se autoejecuta cuando llamo el archivo y me dice que puede ser llamada (la funcion) por otro archivo
    const SentEmail = sequelize.define('SentEmail',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        userType: {
          type: DataTypes.STRING,
          allowNull: false
        },
        emailTemplate: {
          type: DataTypes.STRING,
          allowNull: false
        },
        sendAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        readeAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        uuid: {
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
        tableName: 'sent_emails',//esto me dice que está interactuando con la tabla 'users' 
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
            name: 'sent_emails_userId_fk',
            using: 'BTREE',
            fields: [
              { name: 'userId' }
            ]
          }
        ]
      }
    )
  
    SentEmail.associate = function (models) {
      SentEmail.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    }
  
    return SentEmail //aqui le aclaro si el modelo esta relacionado con otros modelos

  }

