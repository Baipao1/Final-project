import { Sequelize } from 'sequelize'
import config from '../config.json'

const sequelize = new Sequelize(config.dbConnection.database, config.dbConnection.username, config.dbConnection.password, {
	host: 'localhost',
	port:'3307',
	dialect: config.dbConnection.dbtype,
	logging: false
})

export default sequelize