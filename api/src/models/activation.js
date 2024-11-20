module.exports = function (sequelize, DataTypes) {
  const Activation = sequelize.define('Activation',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Usuario".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Usuario".'
          }
        }
      },
      password: {
        type: DataTypes.STRING(255), // Contraseña encriptada
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Contraseña".'
          },
          len: {
            args: [8, 128], // Longitud mínima y máxima permitida
            msg: 'La contraseña debe tener entre 8 y 128 caracteres.'
          },
          customValidator (value) {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ // Requisitos: al menos un número, una mayúscula, una minúscula
            if (!regex.test(value)) {
              throw new Error(
                'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número.'
              )
            }
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
      tableName: 'activations',
      timestamps: true,
      paranoid: true,
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

  return Activation
}
