module.exports = function (sequelize, DataTypes) { // esta funcionalidad se autoejecuta cuando llamo el archivo y me dice que puede ser llamada (la funcion) por otro archivo
  const Contact = sequelize.define('Contact',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      fingerprintId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Nombre".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Nombre".'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Ya existe un usuario con ese correo electrónico.'
        },
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          isEmail: {
            msg: 'Por favor, rellena el campo "Email" con un email válido.'
          }
        }
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Pon un asunto al Mensaje'
          },
          notEmpty: {
            msg: 'Pon un asunto al Mensaje'
          }
        }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Dejanos un Mensaje.'
          },
          notEmpty: {
            msg: 'Dejanos un Mensaje.'
          }
        }
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'contacts', // esto me dice que está interactuando con la tabla 'users'
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
          name: 'contact_fingerprintId_fk',
          using: 'BTREE',
          fields: [
            { name: 'fingerprintId' }
          ]
        }
      ]
    }
  )

  Contact.associate = function (models) {
    Contact.belongsTo(models.Fingerprint, { as: 'fingerprints', foreignKey: 'fingerprintId' })
  }

  return Contact // aqui le aclaro si el modelo esta relacionado con otros modelos
}
