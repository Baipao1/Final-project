import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// Shopping cart表
const CartModel = sequelize.define('CartModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	tablename: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Commodity表名'
	},
	userid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: 'userid'
	},
	goodid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: 'Commodityid'
	},
	goodname: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Product name'
	},
	picture: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: 'Picture'
	},
	buynumber: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: 'BuyAmount'
	},
	price: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: '单价'
	},
	discountprice: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: '会员价'
	},
	goodtype: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Commodity类型'
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
	tableName: 'cart'
})

export default CartModel
