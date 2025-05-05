import { DataTypes } from 'sequelize'
import sequelize from './sequelize'

const ConfigModel = sequelize.define('ConfigModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '配置参数Name'
	},
	value: {
		type: DataTypes.STRING,
		allowNull: true,
		comment: '配置参数Picture'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'config'
})

export default ConfigModel
