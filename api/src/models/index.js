'use strict'

require('dotenv').config()
const fs = require('fs') //sirve para interactual con los archivos del proyecto
const Sequelize = require('sequelize')// sirve para interaqctuar con la bse de datos, cuando Sequelize esta en mayuscula, es la libreria
const process = require('process') //esta libreria, habiendo cargado las variables de entorno, me permite acceder a ellas
const path = require('path')//sirve para construir rutas a un archivo
const basename = path.basename(__filename)// con esto le digo que me devuelva el archivo donde me encuentro
const sequelizeDb = {}

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {// desde aqui

  host: process.env.DATABASE_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})// hasta aqui nos sirve para establecer conexion con la base de datos

fs.readdirSync(__dirname) //mira los nombnre de los archivos que estan en la carpeta en este caso, "models"
  .filter(file => {//le aplicamos un filtro
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    sequelizeDb[model.name] = model
  })

Object.keys(sequelizeDb).forEach(modelName => {
  if (sequelizeDb[modelName].associate) {
    sequelizeDb[modelName].associate(sequelizeDb)
  }
})

sequelizeDb.sequelize = sequelize
sequelizeDb.Sequelize = Sequelize

module.exports = sequelizeDb //funcionalidad de node js que me permite cargar la funcion desde otro archivo