import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// Order
const OrdersModel = sequelize.define('OrdersModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	orderid: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Order ID'
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
		comment: 'Commodity Picture'
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
		comment: 'Price'
	},
	discountprice: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: 'Discount Price'
	},
	total: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: 'Total Price'
	},
	discounttotal: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: 'Total discount Price'
	},
	type: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: 'Payment type'
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Status'
	},
	address: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'address'
	},
	tel: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Phone Number'
	},
	consignee: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Consignee'
	},
	remark: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Remarks'
	},
	logistics: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '物流'
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
	tableName: 'orders'
})

export default OrdersModel
