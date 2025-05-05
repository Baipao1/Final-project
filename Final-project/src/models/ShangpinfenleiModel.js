import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// Commodity classification
const ShangpinfenleiModel = sequelize.define('ShangpinfenleiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	shangpinfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Commodity classification'
	},
	addtime: {
  		type: DataTypes.DATE,
  		defaultValue: DataTypes.NOW,
    	allowNull: false,
    	get() {
            return moment(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: 'Add时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'shangpinfenlei'
})

export default ShangpinfenleiModel
