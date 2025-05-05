import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// Commodity information
const ShangpinxinxiModel = sequelize.define('ShangpinxinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	shangpinmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Product name'
	},
	tupian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: 'Picture'
	},
	shangpinfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Commodity classification'
	},
	guige: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Specification'
	},
	pinpai: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Brand'
	},
	shangpinxiangqing: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: 'Commoditymore'
	},
	clicktime: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('clicktime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '最近点击时间'
	},
	clicknum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: 'Number of clicks'
	},
	price: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: 'Price'
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
	tableName: 'shangpinxinxi'
})

export default ShangpinxinxiModel
