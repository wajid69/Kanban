const { Sequelize } = require('sequelize')
// Load database configuration
const config = require('../../config/config')[process.env.NODE_ENV || 'development']
const sequelize = new Sequelize(config.url, { dialect: 'postgres', logging: false })
const Task = require('./task')(sequelize)
module.exports = { sequelize, Task }
